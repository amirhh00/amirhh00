<script lang="ts">
	import type { PageData } from './$types';
	import { camelCase } from '$lib/utils/etc/case';
	import BackGround3D from '$lib/components/pages/home/BackGround3D.svelte';

	let { data }: { data: PageData } = $props();
	let isDesktop = $state(window.innerWidth > 640);
	function typewriter(node: HTMLElement, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		if (!text) return { duration: 0, tick: () => {} };
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<title> Amirhossein Esmaeili </title>

<meta name="description" content="Amirhossein Esmaeili's personal website" />
<svelte:window on:resize={() => (isDesktop = window.innerWidth > 640)} />
<div id="about" class="text-justify">
	{#snippet laptopContent()}
		<div class="prose pointer-events-none">
			<data.about />
		</div>
		<div class="prose" id="experiences">
			<data.resume />
		</div>
	{/snippet}

	{#if isDesktop}
		<div class="flex h-[calc(100vh_-_var(--header-height,0px))] max-h-[100vw] flex-col gap-4">
			<BackGround3D>
				{@render laptopContent()}
			</BackGround3D>
		</div>
	{:else}
		<div class="container">
			{@render laptopContent()}
		</div>
	{/if}
	<div class="container" id="projects">
		<div class="prose">
			<h2>Projects</h2>
		</div>
		{#if data}
			{#each data.projects as project}
				<div id={camelCase(project.metaData.title as string)} class="mt-4">
					<div class="descriptions prose">
						<project.markdown />
						<p title={(project.metaData.date as string) || ''}>
							<b>Worked on:</b>
							{project.metaData.workedOn.join(', ')}
						</p>
						<p><b>Technologies used:</b> {project.metaData.tools.join(', ')}</p>
					</div>
					<div class="medias not-prose my-4 flex flex-col gap-4">
						{#each project.mediaFiles as media}
							{#if media.type === 'image'}
								<img
									loading="lazy"
									src={media.url}
									alt={media.alt}
									class="mx-auto max-w-full rounded-xl sm:max-w-sm"
								/>
							{:else if media.type === 'video'}
								<video src={media.url} controls class="mx-auto max-w-full rounded-xl sm:max-w-sm">
									<track
										kind="captions"
										src={media.captionsUrl || ''}
										srclang="en"
										label="English"
									/>
								</video>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<div class="container" id="contact">
		<data.contact />
	</div>
</div>
