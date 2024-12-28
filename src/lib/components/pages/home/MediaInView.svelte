<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import type { MediaFile } from '$lib/../@types/projects.type';
	import { fly } from 'svelte/transition';
	import Video from '$lib/components/global/Video.svelte';
	import { noMotion } from '$lib/utils/store/motion.state';

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
	class="mediaWrapper rounded-xl"
	use:inview={options}
	oninview_change={({ detail }) => {
		isInView = detail.inView;
	}}
>
	{#if isInView}
		<div in:fly={{ y: 200, duration: $noMotion ? 0 : 2000 }} class="media">
			{#if media.type === 'unknown'}
				<div></div>
			{:else if media.type === 'image'}
				<div
					style="aspect-ratio: {media.aspect?.value}"
					class="animate relative mx-auto w-full max-w-full overflow-hidden rounded-xl sm:max-w-sm"
				>
					<img
						loading="lazy"
						class="absolute left-0 top-0 h-full w-full object-contain"
						src={media.url}
						alt={media.alt as string}
					/>
				</div>
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
