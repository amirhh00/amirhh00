<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import type { MediaFile, MediaFileBase, VideoMediaFile } from '$lib/../@types/projects.type';
	import { fly, fade } from 'svelte/transition';

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
	use:inview={options}
	oninview_change={({ detail }) => {
		isInView = detail.inView;
		// scrollDirection = detail.scrollDirection.vertical!;
	}}
	class="mediaWrapper"
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
				<video
					preload="none"
					src={media.url}
					poster={(media as VideoMediaFile & MediaFileBase).poster}
					controls
					muted
					autoplay={false}
					style="aspect-ratio: {media.aspect?.value};"
					class={`mx-auto w-full rounded-xl sm:max-w-sm ${isInView ? 'animate' : ''}`}
				>
					<track
						kind="captions"
						src={(media as VideoMediaFile & MediaFileBase).captionsUrl || ''}
						srclang="en"
						label="English"
					/>
				</video>
			{/if}
		</div>
	{:else}
		<div class="aspect-[1/2] w-full"></div>
	{/if}
</div>
