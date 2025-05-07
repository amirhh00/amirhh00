<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	console.log('props: ', data);
	const { personalInfo, experiences, educations, contact, skills, licenseAndCertifications } = data;
</script>

<title>{personalInfo.metadata.name} - {personalInfo.metadata.title} - Resume</title>
<meta name="description" content="Resume of {personalInfo.metadata.name}" />

<div class="a4-resume">
	<div class="content">
		<div class="grid">
			<div class="main-column">
				<header>
					<h1>{personalInfo.metadata.name}</h1>
					<h2>{personalInfo.metadata.title}</h2>
					<personalInfo.default />
				</header>

				<section>
					<h2>WORK EXPERIENCE</h2>
					{#each experiences as job}
						<div class="job">
							<div class="job-header">
								<h3>{job.metadata.title}</h3>
								<span>{job.metadata.period}</span>
							</div>
							<p class="company">{job.metadata.company}</p>
							<job.html />
						</div>
					{/each}
				</section>

				<section>
					<h2>EDUCATION</h2>
					{#each educations as edu}
						<div class="education">
							<div class="education-header">
								<h3>{edu.metadata.degree}</h3>
								<span>{edu.metadata.period}</span>
							</div>
							<p>{edu.metadata.school}</p>
							<edu.html />
						</div>
					{/each}
				</section>
			</div>

			<div class="side-column">
				<section>
					<h2>CONTACT</h2>
					<div class="contact-info">
						<contact.default />
					</div>
				</section>

				<section style="margin-top: 3mm;">
					<h2>SKILLS</h2>

					<div class="skills-group">
						{#each skills as skill}
							<p class="skill">
								{skill}<span style="font-size: 1px;visibility: collapse;">,</span>
							</p>
						{/each}
					</div>
				</section>
				<section>
					<h2>LICENSES & CERTIFICATIONS</h2>
					<div>
						{#each licenseAndCertifications as license}
							<license.html />
						{/each}
					</div>
				</section>
			</div>
		</div>
	</div>
</div>

<style>
	:global {
		body {
			margin: 0;
			padding: 0;
			font-family: Arial, sans-serif;
			font-size: 10px;
			line-height: 1.4;
			text-align: justify;
		}

		.a4-resume {
			width: 210mm;
			height: 297mm;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			margin: 0 auto;
		}

		.content {
			padding: 5mm 6mm;
		}

		.grid {
			display: grid;
			grid-template-columns: 2fr 1fr;
			gap: 5mm;
		}

		h1 {
			font-size: 24px;
			color: #2c3e50;
			margin: 0 0 2mm 0;
		}
		html.dark h1 {
			color: #fff;
		}

		h2 {
			font-size: 15px;
			color: #3498db;
			margin: 0 0 3mm 0;
			border-bottom: 1px solid #3498db;
			padding-bottom: 1mm;
		}

		h3 {
			font-size: 14px;
			margin: 0;
		}

		p {
			margin: 0 0 2mm 0;
			font-size: 13px;
		}

		ul {
			margin: 0;
			padding-left: 4mm;
		}

		li {
			margin-bottom: 1mm;
			font-size: 13px;
			font-weight: lighter;
		}

		.skills-group {
			display: flex;
			flex-wrap: wrap;
			column-gap: 6px;
			font-size: medium;
		}

		.skill {
			background-color: #3498db;
			color: white;
			padding: 2mm;
			border-radius: 4px;
		}

		html.dark .skill {
			background-color: #3498db2c;
		}

		.job,
		.education {
			margin-bottom: 2mm;
		}

		.job-header,
		.education-header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.company {
			font-style: italic;
		}

		.side-column {
			background-color: #f8f9fa;
			padding: 3mm;
		}
		html.dark .side-column {
			background-color: #333;
		}

		.contact-info p {
			margin-bottom: 1mm;
		}

		.skills-group {
			margin-bottom: 3mm;
		}

		.skills-group h3 {
			font-size: 11px;
			margin-bottom: 1mm;
		}
	}

	@page {
		size: A4;
		margin: 0;
	}
	@media print {
		:global(*) {
			page-break-after: avoid;
			page-break-before: avoid;
			margin: 0;
			padding: 0;
		}
		.a4-resume {
			width: 210mm;
			height: 297mm;
			margin: 0;
			box-shadow: none;
			padding: 0;
		}
		.skill {
			background-color: transparent;
			color: black;
			outline: 1px solid #3498db;
			border-radius: 4px;
		}
	}
</style>
