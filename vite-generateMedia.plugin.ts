import mime from 'mime';
import path from 'node:path';
import sharp from 'sharp';
import type { Plugin, UserConfig } from 'vite';
import { getMediaType } from './src/lib/utils/etc/mediaType';
import ffmpegStatic from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';

export function myMediaPlugin(): Plugin {
	let mode = '';
	let cfg: UserConfig = {};
	return {
		name: 'my-media-plugin',
		enforce: 'pre',
		apply(config, env) {
			cfg = config;
			mode = env.mode;
			return true;
		},
		async load(id) {
			const [base, search] = id.split('?');
			if (!search) {
				return null;
			}
			const s = new URLSearchParams(search);
			if (!s.has('myMedia')) {
				return null;
			}
			const mediaType = getMediaType(base);
			if (mediaType === 'image') {
				const img = sharp(base);
				const metadata = await img.metadata();

				const thumb = await generateThumbnail(img, base);

				return `
          import url from '${base}?url';
          export default {
            url,
            type: 'image',
            aspect: {
              x: ${metadata.width},
              y: ${metadata.width},
              value: ${metadata.width! / metadata.height!}
            },
            isImage: true,
            isVideo: false,
            thumbnail: ${thumb ? `'${thumb}'` : 'null'},
            metadata: ${JSON.stringify(metadata)}
          };
        `;
			} else if (mediaType === 'video') {
				let poster = '';
				const aspect = getAspect(base);
				if (mode === 'production' && cfg.optimizeDeps) {
					const hashName = hashImagePath(base);
					const newFilePath = './static/images/posters/' + hashName + '.jpg';
					await fs.mkdir('./static/images/posters/', { recursive: true });
					spawnSync(
						ffmpegStatic!,
						[
							'-ss',
							'00:00:01',
							'-i',
							base,
							'-vframes',
							'1',
							newFilePath,
							'-y',
							'-loglevel',
							'quiet'
						],
						{ stdio: 'pipe', encoding: 'utf-8' }
					);
					// name from base with .jpg extension
					// const fileName = path.basename(base).replace(/\.\w+$/, '.jpg');
					const newSourceFilePath = path.resolve(newFilePath);
					const sourceBuffer = await fs.readFile(newSourceFilePath);
					const source = new Uint8Array(sourceBuffer);
					// exit(0);
					this.emitFile({
						type: 'asset',
						fileName: `${hashName}.jpg`,
						source
					});
					await fs.unlink(newFilePath);
					poster = hashName.toString();
				}
				const metadata = {};
				return `
        import url from '${base}?url';
        export default {
          url,
          poster: '/${poster}.jpg',
          type: 'video',
          isVideo: true,
          isImage: false,
          aspect: ${JSON.stringify(aspect)},
          metadata: ${JSON.stringify(metadata)}
        };
        `;
			}
		}
	};
}

async function generateThumbnail(img: sharp.Sharp, base: string): Promise<string | null> {
	// if is svg, return null
	if (base.endsWith('.svg')) {
		return null;
	}
	const output = await img
		.toFormat('webp', {
			smartSubsample: true
		})
		.blur(1.25)
		.resize({
			width: 32,
			height: 32,
			fit: 'outside',
			kernel: sharp.kernel.cubic
		})
		.toBuffer();
	return `data:${mime.getType(path.extname(base!))};base64,${output.toString('base64')}`;
}

function hashImagePath(s: string) {
	return [...s].reduce((hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0, 0);
}

function getAspect(base: string) {
	const dimensionSpawn = spawnSync(ffmpegStatic!, ['-i', base], {
		stdio: 'pipe',
		encoding: 'utf-8'
	});

	const input = dimensionSpawn.stderr;
	let width = 0;
	let height = 0;
	try {
		const regex = /(\d{3,5})x(\d{3,5})/;
		const match = input.match(regex);
		if (!match || match.length < 3) return { x: 0, y: 0, value: 0 };
		width = Number(match[1]);
		height = Number(match[2]);
		return {
			x: width,
			y: height,
			value: width / height
		};
	} catch (error) {
		console.error('error', input, error);
	}
}
