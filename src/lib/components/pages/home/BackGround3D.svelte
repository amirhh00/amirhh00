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
</script>

<div
	transition:fade|global={{ duration: 1000 }}
	class="flex w-full flex-1 items-center lg:h-screen lg:w-full [&>div]:!h-auto [&>div]:max-h-[100vw] [&>div]:min-h-[65vh] [&>div]:overflow-hidden"
>
	<Canvas>
		<Scene>
			{@render children?.()}
		</Scene>
	</Canvas>
</div>
