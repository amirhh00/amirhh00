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
	class="flex flex-1 flex-col [&>div]:max-h-[100vw] [&>div]:flex-1"
>
	<Canvas>
		<Scene>
			{@render children?.()}
		</Scene>
	</Canvas>
</div>
