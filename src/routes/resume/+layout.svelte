<script lang="ts">
	import { ModeWatcher, setMode, mode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
{@render children()}

<button
	title="Download Resume"
	style="color: currentColor;"
	aria-label="Download Resume"
	onclick={() => {
		window.open(
			'https://raw.githubusercontent.com/amirhh00/amirhh00/refs/heads/main/static/resume.pdf'
		);
	}}
	class="download-resume"
>
	<svg
		width="24"
		height="24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
		/>
	</svg>
</button>

<button
	title="Toggle Theme"
	aria-label="Toggle Theme"
	class="theme-button"
	onclick={() => setMode($mode === 'dark' ? 'light' : 'dark')}
>
	{#if $mode === 'dark'}
		<Moon size="24" />
	{:else}
		<Sun size="24" />
	{/if}
</button>

<button
	title="Print Resume"
	class="print-button"
	aria-label="Print Resume"
	onclick={() => {
		let currentMode = $mode;
		if ($mode === 'dark') {
			setMode('light');
			window.print();
			setMode(currentMode!);
		} else {
			window.print();
		}
	}}
>
	<svg
		fill="currentColor"
		width="24"
		height="24"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			d="M128 0C92.7 0 64 28.7 64 64l0 96 64 0 0-96 226.7 0L384 93.3l0 66.7 64 0 0-66.7c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0L128 0zM384 352l0 32 0 64-256 0 0-64 0-16 0-16 256 0zm64 32l32 0c17.7 0 32-14.3 32-32l0-96c0-35.3-28.7-64-64-64L64 192c-35.3 0-64 28.7-64 64l0 96c0 17.7 14.3 32 32 32l32 0 0 64c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
		/>
	</svg>
</button>

<style>
	:global(html.dark) {
		color: #fff;
	}
	.download-resume {
		position: fixed;
		cursor: pointer;
		bottom: 45mm;
		right: 5mm;
		padding: 5mm;
		border: none;
		border-radius: 100%;
		/* background-color:; */
	}
	.theme-button {
		position: fixed;
		cursor: pointer;
		bottom: 25mm;
		right: 5mm;
		padding: 5mm;
		border: none;
		border-radius: 100%;
	}
	.print-button {
		position: fixed;
		cursor: pointer;
		bottom: 5mm;
		right: 5mm;
		padding: 5mm;
		border: none;
		border-radius: 100%;
	}
	@media print {
		button {
			display: none;
		}
	}
</style>
