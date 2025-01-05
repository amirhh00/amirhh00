<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import type { MediaFile } from '$lib/../@types/projects.type';
	import { fly } from 'svelte/transition';
	import Video from '$lib/components/global/Video.svelte';
	import Image from '$lib/components/global/Image.svelte';
	import { noMotion } from '$lib/utils/store/motion.state';

	interface Props {
		media: MediaFile;
	}

	const { media }: Props = $props();

	const options: Options = {
		unobserveOnEnter: true
	};

	let isInView = $state(false);
</script>

<div
	class="mediaWrapper rounded-xl"
	use:inview={options}
	oninview_change={({ detail }) => {
		isInView = detail.inView;
	}}
>
	{#if isInView}
		<div in:fly={{ y: 50, duration: $noMotion ? 0 : 2000 }} class="media">
			{#if media.type === 'unknown'}
				<div></div>
			{:else if media.type === 'image'}
				<Image {media} />
			{:else if media.type === 'video'}
				<Video {media} {isInView} />
			{/if}
		</div>
	{:else}
		{@const width = media.type === 'image' ? `auto` : '100%'}
		{@const height = media.type === 'image' ? `auto` : 'auto'}
		{@const aspect = media.aspect!.value}
		{@const className =
			media.type === 'image'
				? 'mx-auto w-full rounded-xl sm:max-w-sm max-w-full animate'
				: 'mx-auto w-full overflow-hidden rounded-xl sm:max-w-sm animate'}
		<div class={className} style="width:{width}; height: {height}; aspect-ratio: {aspect}"></div>
	{/if}
</div>
