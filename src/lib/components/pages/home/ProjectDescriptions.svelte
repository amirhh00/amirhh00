<script lang="ts">
	import type { Project } from '$lib/../@types/projects.type';
	import type { Component } from 'svelte';

	// replace mardown with a component instead of a string in CurrPeoject
	type CurrProject = Omit<Project, 'markdown'> & { markdown: Component };
	interface Props {
		project: CurrProject;
	}

	const { project }: Props = $props();
</script>

<div class="descriptions prose">
	<project.markdown />
	<p title={(project.metadata.date as string) || ''}>
		<b>Worked on:</b>
		{project.metadata.workedOn.join(', ')}
	</p>
	<p><b>Technologies used:</b> {project.metadata.tools.join(', ')}</p>
</div>
