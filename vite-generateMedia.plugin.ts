import mime from 'mime';
import path from 'node:path';
import sharp from 'sharp';
import type { Plugin, UserConfig } from 'vite';
import { getMediaType } from './src/lib/utils/etc/mediaType';
import ffmpegStatic from 'ffmpeg-static';
// import {ffmpegPath, ffprobePath} from 'ffmpeg-ffprobe-static';
// import ffmpeg from 'ffmpeg';
import { execSync } from 'node:child_process';

export function myMediaPlugin(): Plugin {
	let mode = '';
	let cfg: UserConfig = {};
	return {
		name: 'my-media-plugin',
		enforce: 'pre',
		apply(config, env) {
			// console.log('env', env);
			// console.log('config', config);
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
				const output = await img
					.toFormat('webp', {
						smartSubsample: true
					})
					.blur(1.25)
					.resize({
						width: 32,
						height: 32,
						fit: 'inside',
						kernel: sharp.kernel.cubic
					})
					.toBuffer();
				const thumb = `data:${mime.getType(path.extname(base!))};base64,${output.toString('base64')}`;

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
            thumbnail: \`${thumb}\`,
            metadata: ${JSON.stringify(metadata)}
          };
        `;
			} else if (mediaType === 'video') {
				// const video = await new ffmpeg(base);
				let poster = '';
				const width = execSync(
					`${ffmpegStatic} -i ${base} 2>&1 | grep Video: | grep -Po '\\d{3,5}x\\d{3,5}' | cut -d'x' -f1`
				)
					.toString()
					.replace(/\n/g, '');

				const height = execSync(
					`${ffmpegStatic} -i ${base} 2>&1 | grep Video: | grep -Po '\\d{3,5}x\\d{3,5}' | cut -d'x' -f2`
				)
					.toString()
					.replace(/\n/g, '');
				const aspect = {
					x: Number(width),
					y: Number(height),
					value: Number(width) / Number(height)
				};
				if (mode === 'production' && cfg.optimizeDeps) {
					const hashName = hashImagePath(base);
					const newFilePath = './static/images/posters/' + hashName + '.jpg';
					// await video.save(newFilePath);
					// use spawn instead of node-ffmpeg to be able to use the ffmpeg-static binary replace if exists and quiet mode
					execSync(
						`${ffmpegStatic} -ss 00:00:01 -i ${base} -vframes 1 ${newFilePath} -y -loglevel quiet`
					);

					// remove ./static from the path
					poster = newFilePath.slice(8);
					// const fileContent = await fs.readFile(newFilePath);
				}
				const metadata = {};
				return `
        import url from '${base}?url';
        export default {
          url,
          poster: '${poster}',
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

function hashImagePath(s: string) {
	return [...s].reduce((hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0, 0);
}