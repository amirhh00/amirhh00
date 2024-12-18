import mustache from 'https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js';
import {
	extractMarkdownMetadata,
	omitMetaDataFromMarkdown
} from '../src/lib/utils/etc/markdownMetadata.ts';
import { getMediaType } from '../src/lib/utils/etc/mediaType.ts';
import type { MediaFileBase, Project } from '../src/@types/projects.type.ts';

type MarkdownProject = Omit<Project, 'mediaFiles'> & { mediaFiles: MediaFileBase[] };

const projects: MarkdownProject[] = [];

for await (const projectDir of Deno.readDir(`${Deno.cwd()}/src/static/projects`)) {
	const markdown = await Deno.readTextFile(
		`${Deno.cwd()}/src/static/projects/${projectDir.name}/description.md`
	);
	const mediaFiles: MediaFileBase[] = [];
	let i = 0;
	for await (const mediaFile of Deno.readDir(
		`${Deno.cwd()}/src/static/projects/${projectDir.name}`
	)) {
		const mediaPath = `src/static/projects/${projectDir.name}/${mediaFile.name}`;
		const type = getMediaType(mediaPath);
		if (type !== 'unknown') {
			mediaFiles.push({
				url: mediaPath,
				type,
				alt: projectDir.name + i++,
				isVideo: type === 'video',
				isImage: type === 'image'
			});
		}
	}
	projects.push({
		markdown: omitMetaDataFromMarkdown(markdown),
		metadata: extractMarkdownMetadata(markdown),
		mediaFiles
	});
}

// sort projects by metadata date
projects.sort((a, b) => {
	const aDate = new Date(a.metadata.date);
	const bDate = new Date(b.metadata.date);
	return bDate.getTime() - aDate.getTime();
});

// generate readme.md
const template = await Deno.readTextFile(`${Deno.cwd()}/README.mustache.md`);
const about = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/about.md`);
const resume = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/resume.md`);
const contact = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/contact.md`);
if (!mustache.render || typeof mustache.render !== 'function')
	throw new Error('Mustache render function not found');
const rendered = mustache.render(template, {
	projects
});

await Deno.writeTextFile(`${Deno.cwd()}/README.md`, `${about}\n${resume}\n${rendered}\n${contact}`);
