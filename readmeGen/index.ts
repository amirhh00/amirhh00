import mustache from 'https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js';

const directories: string[] = [];

for await (const project of Deno.readDir(`${Deno.cwd()}/src/static/projects`)) {
	directories.push(project.name);
}

// generate readme.md
const template = await Deno.readTextFile(`${Deno.cwd()}/README.mustache.md`);
const about = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/about.md`);
const resume = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/resume.md`);
const contact = await Deno.readTextFile(`${Deno.cwd()}/src/lib/components/contact.md`);
// deno-lint-ignore no-explicit-any
const rendered = (mustache as any).render(template, {
	projects: {
		directories: directories.map((directory) => {
			return {
				name: directory,
				description: 'Description',
				url: `https://github.com/amirhh00/amirhh00/${directory}`
			};
		}),
		count: directories.length
	}
});

await Deno.writeTextFile(`${Deno.cwd()}/README.md`, `${about}\n${resume}\n${rendered}\n${contact}`);
