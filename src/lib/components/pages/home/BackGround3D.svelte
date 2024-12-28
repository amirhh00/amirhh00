<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { fade } from 'svelte/transition';
	import { onMount, type Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
	let isDesktop = $state(window.innerWidth > 640);

	let motionReduced = $state(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		mediaQuery.addEventListener('change', () => {
			motionReduced = mediaQuery.matches;
		});
	});
</script>

<svelte:window on:resize={() => (isDesktop = window.innerWidth > 640)} />
{#if isDesktop && !motionReduced}
	<div class="flex h-[calc(100vh_-_var(--header-height,0px))] max-h-[100vw] flex-col gap-4">
		<div
			in:fade|global={{ duration: 1000, delay: 200 }}
			class="flex flex-1 flex-col [&>div]:max-h-[100vw] [&>div]:flex-1"
		>
			<Canvas>
				<Scene>
					{@render children?.()}
				</Scene>
			</Canvas>
		</div>
	</div>
{:else}
	<div class="container">
		{@render children?.()}
	</div>
{/if}
