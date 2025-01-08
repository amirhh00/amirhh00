import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return [
		// should manually add new resumetype here so the svelte-kit can crawl the page
		{ cname: 'ciw' }
	];
};
