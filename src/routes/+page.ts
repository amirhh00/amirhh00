import { dev } from '$app/environment';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { getMediaType } from '$lib/utils/etc/mediaType';
import { metadataToListify } from '$lib/utils/etc/markdownMetadata';
import type { Project } from '../@types/projects.type';

export const load: PageLoad = async () => {
	const allMDFiles = import.meta.glob('/src/static/projects/**/*.md', {
		eager: true
	});
	const allMediaFiles = import.meta.glob('/src/static/projects/**/*.{png,jpg,jpeg,svg,mp4}', {
		eager: true
	});

	const iterableMDFiles = Object.entries(allMDFiles) as [
		string,
		{ default: Component; metadata: Project['metaData'] }
	][];

	const allProjects = await Promise.all(
		iterableMDFiles.map(async ([path, moduleMD]) => {
			const thisPath = path.split('/').slice(0, -1).join('/');
			const mediaFiles = Object.entries(allMediaFiles).flatMap(([mediaPath, moduleMedia]) => {
				return mediaPath.startsWith(thisPath)
					? {
							url: (moduleMedia as any).default,
							type: getMediaType((moduleMedia as any).default),
							alt: moduleMD.metadata.title,
							// TODO: add captions support later for videos
							captionsUrl: undefined as unknown as string
						}
					: [];
			});

			return {
				mediaFiles,
				metaData: metadataToListify(moduleMD.metadata),
				markdown: moduleMD.default
			};
		})
	);

	if (dev) console.log('projects', allProjects);
	// sort projects by metadata date
	const sortedProjects = allProjects.sort((a, b) => {
		const aDate = new Date(a.metaData.date as string);
		const bDate = new Date(b.metaData.date as string);
		return bDate.getTime() - aDate.getTime();
	});
	return {
		projects: sortedProjects,
		about: (await import('$lib/components/about.md')).default,
		resume: (await import('$lib/components/resume.md')).default,
		contact: (await import('$lib/components/contact.md')).default
	};
};
