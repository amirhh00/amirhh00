<script lang="ts">
	import type { VideoMediaFile, MediaFileBase } from '$lib/../@types/projects.type';
	const { media, isInView }: { media: VideoMediaFile & MediaFileBase; isInView: boolean } =
		$props();

	let showVideo = $state(false);
</script>

<div
	class={`mx-auto w-full overflow-hidden rounded-xl sm:max-w-sm ${isInView ? 'animate' : ''}`}
	style="aspect-ratio: {media.aspect?.value};"
>
	{#if !showVideo}
		<figure class={`relative h-full w-full`}>
			<img
				loading="lazy"
				src={media.poster}
				alt={media.alt as string}
				class="h-full w-full object-cover"
			/>
			<button
				type="button"
				class="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-xl bg-white !bg-opacity-50 dark:bg-black"
				onclick={() => (showVideo = true)}
				aria-label="Play video"
			>
				<svg
					width="100"
					height="100"
					class="fill-black dark:fill-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 384 512"
				>
					<path
						d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
					/>
				</svg>
			</button>
		</figure>
	{:else}
		<video
			preload="auto"
			src={media.url}
			controls
			muted
			autoplay
			class="h-full w-full object-contain"
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
