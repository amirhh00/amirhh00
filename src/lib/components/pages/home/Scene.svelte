<script lang="ts">
	import { T } from '@threlte/core';
	import Laptop from './laptop.svelte';

	const { children } = $props();
</script>

<T.AmbientLight intensity={5} />
<T.DirectionalLight intensity={5} position={[0, 0, 5]} />

<T.PerspectiveCamera
	makeDefault
	far={1000}
	near={0.1}
	position={[0, 0, 7]}
	fov={50}
></T.PerspectiveCamera>
<Laptop position={[-0, -1, 0]} rotation={[0, -1.5, -0.2]}>
	{@render children?.()}
</Laptop>
