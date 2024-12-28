import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';

export function myGenPdfPlugin(): import('vite').Plugin {
	let mode = '';
	// let cfg: import('vite').UserConfig = {};
	return {
		name: 'my-pdf-gen-plugin',
		enforce: 'post',
		apply(config, env) {
			// cfg = config;
			mode = env.mode;
			return mode === 'development';
		},
		// after serve, add a new route to generate pdf resume
		configureServer(server) {
			console.log('listening to /generate-pdf-resume');
			server.middlewares.use(async (req, res, next) => {
				if (req.url === '/generate-pdf-resume') {
					if (req.method === 'POST') {
						if (req.headers.referer === undefined) {
							res.end('no referer');
							return;
						}
						// get the url where the request is made
						const resume = req.headers.referer.split('/').at(-2)?.trim().replace('\n', '');
						if (!resume) {
							res.end('no resume');
							return;
						}
						const absolutePath = await savePdf(resume);
						if (absolutePath) {
							const pdf = await fs.readFile(absolutePath?.trim().replace('\n', ''));
							res.end(pdf);
							return;
						}
						res.end('pdf resume generation failed');
						return;
					} else if (req.method === 'GET') {
						res.end('pdf resume generation endpoint');
						return;
					}
				}
				next();
			});
		}
	};
}

async function savePdf(resume = '') {
	// check if deno is installed
	if (!checkIfDenoIsInstalled()) {
		console.warn('Deno is not installed');
		return;
	}
	// deno run -A resumeToPdf/index.ts
	const cmd = 'deno run -A resumeToPdf/index.ts ' + resume;
	console.log('generating pdf resume');
	return await runCmd(cmd);
}

async function checkIfDenoIsInstalled() {
	const cmd = 'deno --version';
	return await runCmd(cmd);
}

async function runCmd(cmd: string) {
	return new Promise<string>((resolve) => {
		const child = spawn(cmd, { shell: true });
		let result = '';
		child.stdout.on('data', (data) => {
			result += data;
		});
		child.stderr.on('data', (data) => {
			console.error(data.toString());
		});
		child.on('close', (code) => {
			if (code !== 0) console.log(`child process exited with code ${code}`);
			resolve(result);
		});
	});
}
