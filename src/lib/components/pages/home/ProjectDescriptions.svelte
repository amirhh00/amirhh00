<script lang="ts">
	import type { Project } from '$lib/../@types/projects.type';
	import { onMount, type Component } from 'svelte';
	import { camelCase } from '$lib/utils/etc/case';

	// replace mardown with a component instead of a string in CurrPeoject
	type CurrProject = Omit<Project, 'markdown'> & { markdown: Component };
	interface Props {
		project: CurrProject;
	}

	const { project }: Props = $props();
</script>

<div class="prose contents">
	<h3 class="group relative z-20" id={camelCase(project.metadata.title as string)}>
		{project.metadata.title}
		<a
			href={`#${camelCase(project.metadata.title as string)}`}
			aria-label={`Link to ${project.metadata.title}`}
			class="absolute -left-8 top-1/2 flex h-full w-8 -translate-y-1/2 transform items-center justify-center text-center no-underline opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100"
		>
			<svg
				fill="currentColor"
				viewBox="0 0 16 16"
				version="1.1"
				width="16"
				height="16"
				aria-hidden="true"
			>
				<path
					d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"
				>
				</path>
			</svg>
		</a>
	</h3>
</div>
<div class="descriptions prose">
	<project.markdown />
	<p title={(project.metadata.date as string) || ''}>
		<b>Worked on:</b>
		{project.metadata.workedOn.join(', ')}
	</p>
	<p><b>Technologies used:</b> {project.metadata.tools.join(', ')}</p>
</div>

<style>
	:global(.project) :global(h3) {
		position: sticky;
		top: var(--header-height);
		padding: 8px;
		padding-left: 0;
		display: inline;
		background-color: hsl(var(--background));
	}
</style>
