<script lang="ts">
	import type { PageData } from './$types';
	import { camelCase } from '$lib/utils/etc/case';

	let { data }: { data: PageData } = $props();
</script>

<div class="mt-4 text-justify">
	<div class="prose" id="about">
		<data.about />
	</div>

	<div class="prose" id="experiences">
		<data.resume />
	</div>

	<div id="projects">
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
								<img src={media.url} alt={media.alt} class="mx-auto max-w-sm rounded-xl" />
							{:else if media.type === 'video'}
								<video src={media.url} controls class="mx-auto max-w-sm rounded-xl">
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

	<div id="contact">
		<data.contact />
	</div>
</div>
