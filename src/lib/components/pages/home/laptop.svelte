<script lang="ts">
	import * as THREE from 'three';

	import { type Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { T, useTask, useThrelte, type Props } from '@threlte/core';
	import { useGltf, useSuspense } from '@threlte/extras';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
	import { HTML } from '@threlte/extras';
	import { interactivity } from '@threlte/extras';
	import { fade } from 'svelte/transition';
	import { mode } from 'mode-watcher';
	import type { TEvent } from '$lib/../@types/threlte.type';

	interactivity();
	let lastPointerPositionDown = { x: 0, y: 0 };
	let progress = new Tween(-1.6, {
		duration: 400,
		easing: cubicOut
	});

	let monitor = $state<THREE.Group>();
	let open = $state(false);

	$effect(() => {
		if (open) {
			progress.set(0.2);
		} else {
			progress.set(-1.6);
		}
	});

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
	} = $props();

	const suspend = useSuspense();

	type GLTFResult = {
		nodes: {
			Object_11: THREE.Mesh;
			Object_13: THREE.Mesh;
			Object_15: THREE.Mesh;
			Object_17: THREE.Mesh;
			Object_19: THREE.Mesh;
			Object_21: THREE.Mesh;
			Object_23: THREE.Mesh;
			Object_25: THREE.Mesh;
			Object_27: THREE.Mesh;
			Object_29: THREE.Mesh;
			Object_31: THREE.Mesh;
			Object_33: THREE.Mesh;
			Object_35: THREE.Mesh;
			Object_37: THREE.Mesh;
			Object_39: THREE.Mesh;
			Object_41: THREE.Mesh;
			Object_43: THREE.Mesh;
			Object_45: THREE.Mesh;
			Object_47: THREE.Mesh;
			Object_49: THREE.Mesh;
			Object_9: THREE.Mesh;
			Object_27_1: THREE.Mesh;
			Object_27_2: THREE.Mesh;
			Object_8: THREE.Mesh;
		};
		materials: {
			['Material.012']: THREE.MeshStandardMaterial;
			['Material.044']: THREE.MeshStandardMaterial;
			['Material.007']: THREE.MeshStandardMaterial;
			monitor: THREE.MeshStandardMaterial;
			['Material.001']: THREE.MeshStandardMaterial;
		};
	};
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/draco/');
	const gltf = suspend(
		useGltf<GLTFResult>('/laptop.glb', {
			dracoLoader
		})
	);

	const v = new THREE.Vector3();
	const { camera: writableCamera } = useThrelte();
	const camera = writableCamera.current as THREE.PerspectiveCamera;
	const pointer = { x: 0, y: 0 };

	useTask(() => {
		// pointer is current cursor position
		v.copy({ x: pointer.x, y: pointer.y, z: 0 });
		v.unproject(camera);
		camera.position.lerp({ x: -pointer.x * 2, y: -pointer.y, z: camera.position.z }, 0.02);
		camera.lookAt(0, 0, 0);
		camera.updateProjectionMatrix();
	});
</script>

<svelte:window
	on:mousemove={({ clientX, clientY }) => {
		pointer.x = (clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(clientY / window.innerHeight) * 2 + 1;
	}}
	on:scroll={() => {
		if (window.scrollY > window.innerHeight / 4) {
			open = false;
		} else {
			open = true;
		}
	}}
/>

<T.Group bind:ref dispose={false as never} {...props as any}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Group name="Cube002_106" position={[0, 0.47, 0]} rotation={[0, 0, -0.02]}>
			<T.Mesh
				name="Object_9"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_9.geometry}
				material={gltf.materials['Material.044']}
			/>
			<T.Mesh
				name="Object_11"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_11.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 0.09]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.88]}
			/>
			<T.Mesh
				name="Object_13"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_13.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 2.02]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.18]}
			/>
			<T.Mesh
				name="Object_15"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_15.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, -1.84]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.34]}
			/>
			<T.Mesh
				name="Object_17"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_17.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, 1.57]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_19"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_19.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, 1.97]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.24]}
			/>
			<T.Mesh
				name="Object_21"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_21.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, -1.85]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.32]}
			/>
			<T.Mesh
				name="Object_23"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_23.geometry}
				material={gltf.materials['Material.012']}
				position={[0.55, -0.09, 2.08]}
				rotation={[0, 0, -0.1]}
				scale={[0.07, 0.03, 0.12]}
			/>
			<T.Mesh
				name="Object_25"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_25.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 1.69]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_27"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_27.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, -0.94]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_29"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_29.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, -2.05]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_31"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_31.geometry}
				material={gltf.materials['Material.012']}
				position={[1.73, -0.21, -1.77]}
				rotation={[0, 0, -0.1]}
				scale={[0.06, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_33"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_33.geometry}
				material={gltf.materials['Material.012']}
				position={[1.86, -0.22, -1.77]}
				rotation={[0, 0, -0.1]}
				scale={[0.06, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_35"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_35.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, 1.89]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.32]}
			/>
			<T.Mesh
				name="Object_37"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_37.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, 1.42]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_39"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_39.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, 1.64]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_41"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_41.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, 2]}
				rotation={[0, 0, -0.1]}
				scale={[0.11, 0.03, 0.2]}
			/>
			<T.Mesh
				name="Object_43"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_43.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, -1.96]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.22]}
			/>
			<T.Mesh
				name="Object_45"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_45.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, 1.75]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_47"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_47.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, 2.05]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.16]}
			/>
			<T.Mesh
				name="Object_49"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_49.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, -1.91]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.27]}
			/>
		</T.Group>
		<T.Group
			bind:ref={monitor}
			oncreate={() => {
				setTimeout(() => {
					open = true;
				}, 500);
			}}
			name="monitor"
			position={[0.07, 0.45, 0]}
			rotation={[0, 0, progress.current]}
		>
			<T.Mesh
				name="Object_27_1"
				onpointerup={(e: TEvent) => {
					if (
						lastPointerPositionDown.x === Number(e.pointer.x.toPrecision(1)) &&
						lastPointerPositionDown.y === Number(e.pointer.y.toPrecision(1))
					) {
						open = !open;
					} else {
						console.log('drag', lastPointerPositionDown, e.pointer);
					}
				}}
				onpointerdown={(e: TEvent) => {
					lastPointerPositionDown = {
						x: Number(e.pointer.x.toPrecision(1)),
						y: Number(e.pointer.y.toPrecision(1))
					};
				}}
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_27_1.geometry}
				material={gltf.materials['Material.007']}
			/>
			<T.Mesh
				name="Object_27_2"
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_27_2.geometry}
				material={new THREE.MeshStandardMaterial({
					color: $mode === 'dark' ? 0x000000 : 0xffffff,
					transparent: true,
					roughness: 0.65,
					metalness: 0.7,
					opacity: 1
				})}
			/>
			<T.Group rotation={[0, Math.PI / 2, 0]} position={[0.15, 1.6, 0]}>
				<HTML rotation={[0.1, 0, 0]} scale={0.3} transform>
					{#if open}
						<div class="text-left" in:fade={{ delay: 200 }}>
							{@render children?.()}
						</div>
					{/if}
				</HTML>
			</T.Group>
		</T.Group>
		<T.Mesh
			name="Object_8"
			castShadow
			receiveShadow
			geometry={gltf.nodes.Object_8.geometry}
			material={gltf.materials['Material.001']}
			position={[0, 0.45, 0]}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}
</T.Group>
