<script lang="ts">
	import type { ImageMediaFile, MediaFile } from '$lib/../@types/projects.type';
	import { onMount } from 'svelte';

	interface Props {
		media: MediaFile;
	}
	let img: HTMLImageElement;
	const { media }: Props = $props();
	let loaded = $state(false);
	const thumbnail = (media as ImageMediaFile).thumbnail;
	onMount(() => {
		img.addEventListener('load', () => {
			loaded = true;
		});
	});
</script>

<div
	style="aspect-ratio: {media.aspect?.value}"
	class="animate relative mx-auto grid w-full max-w-full overflow-hidden rounded-xl sm:max-w-sm"
>
	<img
		bind:this={img}
		loading="lazy"
		class="absolute left-0 top-0 h-full w-full object-contain [grid-column:1] [grid-row:1] {loaded
			? ''
			: 'loading'}"
		src={media.url}
		alt={media.alt as string}
	/>
	{#if thumbnail && !loaded}
		<img
			loading="lazy"
			class="absolute left-0 top-0 h-full w-full object-contain [grid-column:1] [grid-row:1]"
			src={thumbnail}
			alt={media.alt as string}
		/>
	{/if}
</div>
