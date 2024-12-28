<script lang="ts">
	import type { PageData } from './$types';
	import { camelCase } from '$lib/utils/etc/case';
	import BackGround3DDesktop from '$lib/components/pages/home/BackGround3D.svelte';
	import MediaInView from '$lib/components/pages/home/MediaInView.svelte';
	import ProjectDescriptions from '$lib/components/pages/home/ProjectDescriptions.svelte';

	let { data }: { data: PageData } = $props();
</script>

<title> Amirhossein Esmaeili </title>

<meta name="description" content="Amirhossein Esmaeili's personal website" />

<div id="about" class="scroll-mt-[var(--header-height)] text-justify">
	{#snippet laptopContent()}
		<div class="prose pointer-events-none">
			<data.about />
		</div>
		<div class="prose" id="experiences">
			<data.resume />
		</div>
	{/snippet}

	<BackGround3DDesktop>
		{@render laptopContent()}
	</BackGround3DDesktop>

	<div class="container relative">
		<div class="prose">
			<h2 id="projects">Projects</h2>
			<ul class="mb-8">
				{#if data}
					{#each data.projects as project}
						<li title={`click to view ${project.metadata.title}`}>
							<a href={`#${camelCase(project.metadata.title as string)}`}>
								{project.metadata.title}
							</a>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
		{#if data}
			{#each data.projects as project}
				<div class="project mt-4">
					<ProjectDescriptions project={project as any} />
					<div class="medias not-prose relative z-10 my-4 flex flex-col gap-4">
						{#each project.mediaFiles as media}
							<MediaInView {media} />
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<div class="container prose my-4" id="contact">
		<data.contact />
	</div>
</div>
