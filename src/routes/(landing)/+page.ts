import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { metadataToListify as metadataToList } from '$lib/utils/etc/markdownMetadata';
import type { MediaFile, Project } from '$lib/../@types/projects.type';
import { dev } from '$app/environment';

export const load: PageLoad = async () => {
	const allMDFiles = import.meta.glob('/src/static/projects/**/*.md', {
		eager: true
	});
	const allMediaFiles = import.meta.glob<{ default: MediaFile }>(
		'/src/static/projects/**/*.{png,jpg,jpeg,svg,mp4}',
		{
			query: 'myMedia',
			eager: true
		}
	);
	const iterableMDFiles = Object.entries(allMDFiles) as [
		string,
		{ default: Component; metadata: Project['metadata'] }
	][];

	const allProjects = await Promise.all(
		iterableMDFiles.map(async ([path, moduleMD]) => {
			const thisPath = path.split('/').slice(0, -1).join('/');
			const mediaFiles = Object.entries(allMediaFiles).flatMap(([mediaPath, moduleMedia]) => {
				if (mediaPath.startsWith(thisPath)) {
					const { alt, ...defaultMediaDetails } = moduleMedia.default;
					// const mediaType = getMediaType(url);
					const media: MediaFile = {
						alt: (moduleMD.metadata.title as string) || alt,
						...defaultMediaDetails
					};
					// // TODO: add captions support later for videos
					// if (mediaType === 'video') {
					// 	(media as MediaFile<'video'>).captionsUrl = undefined as unknown as string;
					// } else if (mediaType === 'image') {
					// 	(media as MediaFile<'image'>).thumbnail = (mediaDetails as DefaultImage).thumbnail;
					// }
					return media;
				}
				return [];
			});

			return {
				mediaFiles,
				metadata: metadataToList(moduleMD.metadata),
				markdown: moduleMD.default
			};
		})
	);

	if (dev) console.log('projects', allProjects);
	// sort projects by date
	const sortedProjects = allProjects.toSorted((a, b) => {
		const aDate = new Date(a.metadata.date as string);
		const bDate = new Date(b.metadata.date as string);
		return bDate.getTime() - aDate.getTime();
	});

	return {
		projects: sortedProjects,
		about: (await import('$lib/components/about.md')).default,
		resume: (await import('$lib/components/resume.md')).default,
		contact: (await import('$lib/components/contact.md')).default
	};
};
