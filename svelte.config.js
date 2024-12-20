import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeAttr from 'rehype-attr';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import { removeH3FromMarkdown } from './myRehypePlugin.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [removeH3FromMarkdown, rehypeAttr],
			remarkPlugins: [remarkGfm, remarkFootnotes]
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	},

	extensions: ['.svelte', '.md']
};

export default config;
