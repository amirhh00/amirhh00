<script lang="ts">
	import mftLogo from './cert_assets/mftlogo.png';
	const certifications = [
		{
			metadata: {
				title: 'Certified Internet Webmaster (CIW)',
				organization: 'Tehran Institute of Technology',
				date: '2013-2015',
				logo: mftLogo
			},
			link: '/certifications/ciw'
		}
	];
</script>

<div class="p-4">
	<div class="container mx-auto">
		<div class=" ">
			<div class="prose mx-auto">
				<h1>Certifications</h1>
				<p>Below are some of the certifications I have acquired over the years.</p>
			</div>

			{#each certifications as cert}
				<div class="certification card flex flex-col items-center">
					<img
						class="mb-4 object-contain md:mb-0 md:mr-6"
						src={cert.metadata.logo}
						alt={cert.metadata.title}
					/>
					<div class="prose">
						<h2 class="text-xl font-semibold">{cert.metadata.title}</h2>
						<p class="opacity-90">{cert.metadata.organization}</p>
						<p class="mb-2 text-sm opacity-70">({cert.metadata.date})</p>
						<a href={cert.link} class="btn mt-4 md:mt-0">View more</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.certification {
		padding: 24px;
	}
	:global(html.dark) .certification img {
		filter: invert(1);
	}
</style>
