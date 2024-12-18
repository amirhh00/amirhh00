import { sveltekit } from '@sveltejs/kit/vite';
import { myMediaPlugin } from './vite-generateMedia.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [myMediaPlugin(), sveltekit()],
	ssr: { noExternal: ['postprocessing'] }
});
