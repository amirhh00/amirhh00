<script lang="ts">
	import img1 from './../cert_assets/01.jpg';
	import img2 from './../cert_assets/02.jpg';
	import img3 from './../cert_assets/03.jpg';
	import img4 from './../cert_assets/04.jpg';
	import img5 from './../cert_assets/05.jpg';

	const ciwCertification = {
		metadata: {
			title: 'Certified Internet Webmaster (CIW)',
			organization: 'Tehran Institute of Technology',
			date: '2013-2015',
			logo: '/cert_assets/mftlogo.png'
		},
		images: [img1, img2, img3, img4, img5]
	};
</script>

<div class="p-4">
	<div class="container mx-auto">
		<div class=" ">
			<div class="prose mx-auto">
				<h1>Certified Internet Webmaster (CIW)</h1>
				<!-- <p>
          Mft 
        </p> -->
			</div>

			<div class="certification card flex flex-col items-center md:flex-row">
				<div class="prose mx-auto text-center">
					<h2 class="text-xl font-semibold">{ciwCertification.metadata.title}</h2>
					<p class="opacity-90">{ciwCertification.metadata.organization}</p>
					<p class="mb-2 text-sm opacity-70">({ciwCertification.metadata.date})</p>
					{#each ciwCertification.images as img}
						<img
							class="mb-4 h-full w-full object-contain md:mb-0 md:mr-6"
							src={img}
							alt={ciwCertification.metadata.title}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
