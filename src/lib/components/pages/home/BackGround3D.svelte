<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
	let isDesktop = $state(window.innerWidth > 640);
</script>

<svelte:window on:resize={() => (isDesktop = window.innerWidth > 640)} />
{#if isDesktop}
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
