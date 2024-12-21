import { error, redirect } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';
import type { Component } from 'svelte';

export const prerender = true;

export const entries: EntryGenerator = () => {
	return [
		// should manually add new resumetype here so the svelte-kit can crawl the page
		{ resumetype: 'frontend-software-engineer' },
		{ resumetype: 'fullstack-csharp-developer' }
	];
};

type PersonalInfo = {
	default: Component;
	metadata: {
		name: string;
		title: string;
	};
};

type Contact = {
	default: Component;
};

type Experience = {
	default: Component;
	metadata: {
		title: string;
		company: string;
		period: string;
	};
};

type Educations = {
	default: Component;
	metadata: {
		degree: string;
		school: string;
		period: string;
	};
};

type LicenseAndCertifications = {
	default: Component;
	metadata: {
		title: string;
		issuer: string;
		/** @example 2013 - 2015 */
		period: string;
	};
};

type MyParams = {
	resumetype: string;
};

export const load: PageLoad = async ({ params }) => {
	const resumeType = (params as MyParams).resumetype;
	if (!resumeType) redirect(302, '/resume/frontend-software-engineer');
	const personalInfo = Object.entries(
		import.meta.glob<PersonalInfo>('./**/personalInfo.md', { eager: true })
	).find(([path]) => isInSamePathAsQueryParam(path, resumeType));
	if (!personalInfo) throw error(404, 'Resume not found');
	const contact = Object.entries(
		import.meta.glob<Contact>('./**/contact.md', { eager: true })
	).find(([path]) => isInSamePathAsQueryParam(path, resumeType));
	if (!contact) throw error(404, 'Contact not found');
	const skills = Object.entries(
		import.meta.glob<{ default: string }>('./**/skills.md', { eager: true, query: 'raw' })
	).flatMap(([path, module]) => {
		if (isInSamePathAsQueryParam(path, resumeType))
			return module.default
				.split('\n')
				.flatMap((skill) => (skill ? skill.trim().substring(2) : []));
		return [];
	});
	if (!skills.length) throw error(404, 'Skills not found');

	const experiences = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./**/experiences/*.md', {
					eager: true
				})
			).flatMap(([path, module]) => {
				if (!isInSamePathAsQueryParam(path, resumeType)) return [];
				const { default: html, metadata } = module as Experience;
				return { html, metadata };
			})
		)
	).sort((a, b) => {
		const aEndDate = new Date(a.metadata.period.split('-')[1].trim());
		const bEndDate = new Date(b.metadata.period.split('-')[1].trim());
		return bEndDate.getTime() - aEndDate.getTime();
	});
	if (!experiences.length) throw error(404, 'Experiences not found');

	const educations = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./**/educations/*.md', {
					eager: true
				})
			).flatMap(([path, module]) => {
				if (!isInSamePathAsQueryParam(path, resumeType)) return [];
				const { default: html, metadata } = module as Educations;
				return { html, metadata };
			})
		)
	).sort((a, b) => {
		const aEndDate = a.metadata.period.includes('-')
			? new Date(a.metadata.period.split('-')[1].trim())
			: new Date(a.metadata.period.trim());
		const bEndDate = b.metadata.period.includes('-')
			? new Date(b.metadata.period.split('-')[1].trim())
			: new Date(b.metadata.period.trim());
		return bEndDate.getTime() - aEndDate.getTime();
	});
	if (!educations.length) throw error(404, 'Educations not found');

	const licenseAndCertifications = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./**/licenseAndCertifications/*.md', {
					eager: true
				})
			).flatMap(([path, module]) => {
				if (!isInSamePathAsQueryParam(path, resumeType)) return [];
				const { default: html, metadata } = module as LicenseAndCertifications;
				return { html, metadata };
			})
		)
	).sort((a, b) => {
		const aEndDate = new Date(a.metadata.period.split('-')[1].trim());
		const bEndDate = new Date(b.metadata.period.split('-')[1].trim());
		return bEndDate.getTime() - aEndDate.getTime();
	});
	if (!licenseAndCertifications.length) throw error(404, 'License and Certifications not found');

	return {
		personalInfo: personalInfo[1],
		contact: contact[1],
		skills,
		experiences,
		educations,
		licenseAndCertifications
	};
};

function isInSamePathAsQueryParam(path: string, queryParam: string) {
	const pathSegments = path.split('/');
	const queryFolder = pathSegments.find((segment) => segment === queryParam);
	return queryFolder === queryParam;
}
