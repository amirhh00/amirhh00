import puppeteer from 'npm:puppeteer';

/**
 * @example 
 deno run -A resumeToPdf/index.ts fullstack-csharp-developer
 */

const browser = await puppeteer.launch();
const page = await browser.newPage();
const BASE_URL = 'http://localhost:5173';
const resumeType = Deno.args[0] ? `${Deno.args[0]}/` : '';
await page.goto(`${BASE_URL}/resume/${resumeType}`, {
	waitUntil: 'networkidle2'
});
await page.pdf({
	path: `./static/${resumeType ? resumeType.replace('/', '') : 'resume'}.pdf`,
	format: 'A4',
	margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
});

await browser.close();
