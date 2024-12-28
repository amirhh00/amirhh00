import { sveltekit } from '@sveltejs/kit/vite';
import { myMediaPlugin } from './vite-generateMedia.plugin';
import { myGenPdfPlugin } from './vite-generatePdfResume.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [myMediaPlugin(), myGenPdfPlugin(), sveltekit()],
	ssr: { noExternal: ['postprocessing'] }
});
