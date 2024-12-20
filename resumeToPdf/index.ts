import puppeteer from 'npm:puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
const BASE_URL = Deno.env.get('BASE_URL') || 'http://amirhossein-esmaeili.com';
await page.goto(BASE_URL + '/resume', {
	waitUntil: 'networkidle2'
});
await page.pdf({
	path: './static/resume.pdf',
	format: 'A4',
	margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
});

await browser.close();
