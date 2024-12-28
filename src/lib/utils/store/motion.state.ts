import { writable } from 'svelte/store';

// listen for changes to the user's preference
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

mediaQuery.addEventListener('change', (e) => {
	noMotion.set(e.matches);
});

export const noMotion = writable(mediaQuery.matches);
