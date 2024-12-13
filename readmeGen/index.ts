import mustache from 'https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js';
import {
	extractMarkdownMetaData,
	omitMetaDataFromMarkdown
} from '../src/lib/utils/etc/markdownMetadata.ts';
import { getMediaType } from '../src/lib/utils/etc/mediaType.ts';
import type { Project } from '../src/@types/projects.type.ts';

const projects: Project[] = [];

for await (const projectDir of Deno.readDir(`${Deno.cwd()}/src/static/projects`)) {
	const markdown = await Deno.readTextFile(
		`${Deno.cwd()}/src/static/projects/${projectDir.name}/description.md`
	);
	const mediaFiles: Project['mediaFiles'] = [];
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
				captionsUrl: '',
				isVideo: type === 'video',
				isImage: type === 'image'
			});
		}
	}
	projects.push({
		markdown: omitMetaDataFromMarkdown(markdown),
		metaData: extractMarkdownMetaData(markdown),
		mediaFiles
	});
}

// sort projects by metadata date
projects.sort((a, b) => {
	const aDate = new Date(a.metaData.date);
	const bDate = new Date(b.metaData.date);
	return bDate.getTime() - aDate.getTime();
});

// generate readme.md
const template = await Deno.readTextFile(`${Deno.cwd()}/README.mustache.md`);
const about = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/about.md`);
const resume = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/resume.md`);
const contact = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/contact.md`);
// deno-lint-ignore no-explicit-any
const rendered = (mustache as any).render(template, {
	projects
});

await Deno.writeTextFile(`${Deno.cwd()}/README.md`, `${about}\n${resume}\n${rendered}\n${contact}`);
