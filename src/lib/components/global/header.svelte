<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from './themeToggle.svelte';

	function handleLinkClick(e: MouseEvent) {
		// Add smooth scrolling to all links
		e.preventDefault();
		const link = e.target as HTMLAnchorElement;
		window.history.pushState({}, '', link.href);
		const target = document?.querySelector(link.hash);
		target?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(() => {
		window.addEventListener('popstate', (e) => {
			e.preventDefault();
			if (location.hash) {
				const target = document.querySelector(location.hash);
				target?.scrollIntoView({ behavior: 'smooth' });
			} else {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	});
</script>

<nav class="flex border-b-2">
	<div class="container flex items-center justify-between">
		<ul class="-ml-2 flex gap-2 py-2">
			<li class="p-2"><a on:click|preventDefault={handleLinkClick} href="#about">About</a></li>
			<li class="p-2">
				<a on:click|preventDefault={handleLinkClick} href="#experiences">Experiences</a>
			</li>
			<li class="p-2">
				<a on:click|preventDefault={handleLinkClick} href="#projects">Projects</a>
			</li>
			<li class="p-2"><a on:click|preventDefault={handleLinkClick} href="#contact">Contact</a></li>
		</ul>
		<ThemeToggle />
	</div>
</nav>
