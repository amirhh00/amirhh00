<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '$lib/../app.css';
	import Header from '$lib/components/global/header.svelte';
	import Footer from '$lib/components/global/footer.svelte';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<Header />
<main
	class="mt-[var(--header-height)] min-h-[calc(100vh_-_var(--header-height)_-_var(--footer-height))]"
>
	{@render children()}
</main>
<Footer />
