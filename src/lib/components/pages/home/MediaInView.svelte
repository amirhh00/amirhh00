<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import type { MediaFile } from '$lib/../@types/projects.type';
	import { fly, fade } from 'svelte/transition';
	import Video from '$lib/components/global/Video.svelte';

	interface Props {
		media: MediaFile;
	}

	const { media }: Props = $props();

	const options: Options = {
		unobserveOnEnter: true
	};

	let isInView = $state(false);
	// let scrollDirection = $state('down');
</script>

<div
	class="mediaWrapper w-full"
	style="aspect-ratio: {media.aspect?.value};"
	use:inview={options}
	oninview_change={({ detail }) => {
		isInView = detail.inView;
		// scrollDirection = detail.scrollDirection.vertical!;
	}}
>
	{#if isInView}
		<div in:fly={{ y: 200, duration: 2000 }} out:fade class="media">
			{#if media.type === 'unknown'}
				<div></div>
			{:else if media.type === 'image'}
				<img
					loading="lazy"
					width={media.metadata.width}
					height={media.metadata.height}
					src={media.url}
					alt={media.alt as string}
					class={`mx-auto w-full rounded-xl sm:max-w-sm ${isInView ? 'animate' : ''}`}
				/>
			{:else if media.type === 'video'}
				<Video {media} {isInView} />
			{/if}
		</div>
	{:else}
		<div class="h-full w-full"></div>
	{/if}
</div>
