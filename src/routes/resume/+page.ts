import type { PageLoad } from './$types';
import type { Component } from 'svelte';
import skillsRaw from './skills.md?raw';

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

export const load: PageLoad = async () => {
	const personalInfo = Object.entries(
		import.meta.glob<PersonalInfo>('./personalInfo.md', { eager: true })
	)[0][1];

	const contact = Object.entries(import.meta.glob<Contact>('./contact.md', { eager: true }))[0][1];
	// turn raw markdown into array of skills. markdown is in the format of a list only
	const skills = skillsRaw
		.split('\n')
		.map((skill) => skill.trim().substring(2))
		.filter((skill) => skill);
	const experiences = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./experiences/*.md', {
					eager: true
				})
			).map(async ([, module]) => {
				const { default: html, metadata } = module as Experience;
				return { html, metadata };
			})
		)
	).sort((a, b) => {
		const aEndDate = new Date(a.metadata.period.split('-')[1].trim());
		const bEndDate = new Date(b.metadata.period.split('-')[1].trim());
		return bEndDate.getTime() - aEndDate.getTime();
	});

	const educations = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./educations/*.md', {
					eager: true
				})
			).map(async ([, module]) => {
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

	const licenseAndCertifications = (
		await Promise.all(
			Object.entries(
				import.meta.glob('./licenseAndCertifications/*.md', {
					eager: true
				})
			).map(async ([, module]) => {
				const { default: html, metadata } = module as LicenseAndCertifications;
				return { html, metadata };
			})
		)
	).sort((a, b) => {
		const aEndDate = new Date(a.metadata.period.split('-')[1].trim());
		const bEndDate = new Date(b.metadata.period.split('-')[1].trim());
		return bEndDate.getTime() - aEndDate.getTime();
	});

	return {
		personalInfo,
		contact,
		skills,
		experiences,
		educations,
		licenseAndCertifications
	};
};
