<script lang="ts">
	import ThemeToggle from './themeToggle.svelte';
	import { Button } from '$lib/components/ui/button';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';

	let isDesktop = $state(window.innerWidth > 640);
	let open = $state(window.innerWidth > 640);
	let isHome = $state($page.url.pathname === '/');
	onNavigate((e) => {
		isHome = e.to?.url.pathname === '/';
	});

	const handleNavLinkClick = () => {
		if (!isDesktop) {
			open = false;
		}
	};
</script>

<!-- listen to resize width -->
<svelte:window
	on:resize={() => {
		if (window.innerWidth > 640) {
			open = true;
			isDesktop = true;
		} else {
			open = false;
			isDesktop = false;
		}
	}}
/>

<nav
	data-open={open}
	class="fixed top-0 z-[99999999] flex w-screen items-center border-b-2 bg-[hsl(var(--background))] sm:h-[var(--header-height)]"
>
	<div class="container flex items-start justify-between py-2">
		<a href="/">
			<p class="logo pointer-events-none font-mono text-xl leading-10">AE</p>
		</a>
		{#if open}
			<ul class="-ml-2 mt-8 gap-2 sm:mt-0 sm:flex">
				{#if isHome}
					<li transition:slide|global class="p-2">
						<a onclick={handleNavLinkClick} href="#about">About</a>
					</li>
					<li transition:slide|global class="p-2">
						<a onclick={handleNavLinkClick} href="#projects">Projects</a>
					</li>
					<li transition:slide|global class="p-2">
						<a onclick={handleNavLinkClick} href="#contact">Contact</a>
					</li>
				{:else}
					<li transition:slide|global class="p-2">
						<a onclick={handleNavLinkClick} href="/">Home</a>
					</li>
				{/if}
				<li transition:slide|global class="p-2">
					<a onclick={handleNavLinkClick} href="/certifications">Certifications</a>
				</li>
				<li data-sveltekit-reload transition:slide|global class="p-2">
					<a onclick={handleNavLinkClick} href="/resume/">Resume</a>
				</li>

				{#if !isDesktop}
					<li transition:slide|global={{ duration: 10 }} class="block p-2 sm:hidden">
						<ThemeToggle />
					</li>
				{/if}
			</ul>
		{/if}
		<div class="hidden sm:block">
			<ThemeToggle />
		</div>
		<div class="hamburger sm:hidden">
			<Button on:click={() => (open = !open)} variant="outline" size="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-[1.2rem] w-[1.2rem]"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</Button>
		</div>
	</div>
</nav>
