<script lang="ts">
	import * as THREE from 'three';

	import { type Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { T, useTask, useThrelte, type Props } from '@threlte/core';
	import { useCursor, useGltf, useSuspense } from '@threlte/extras';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
	import { HTML } from '@threlte/extras';
	import { interactivity } from '@threlte/extras';
	import { fade } from 'svelte/transition';
	import { mode } from 'mode-watcher';
	import type { TEvent } from '$lib/../@types/threlte.type';
	import { typewriter } from '$lib/utils/transitions';
	import fragmentShader from '$lib/utils/shaders/crt.fragment.glsl?raw';
	import vertexShader from '$lib/utils/shaders/crt.vertex.glsl?raw';
	import rertroBg from '$lib/utils/shaders/fallout_crt.png';
	import noise from '$lib/utils/shaders/noise.jpg';

	interactivity();
	let tweenProgress = new Tween(-1.6, {
		duration: 400,
		easing: cubicOut
	});

	let scaleProgress = new Tween(0, {
		duration: 400,
		easing: cubicOut
	});
	const { hovering } = useCursor();
	const { hovering: monitorHovering } = useCursor();

	let monitor = $state<THREE.Group>();
	let retro = $state(false);
	let open = $state(false);
	let scaleToOne = $state(false);
	let speed = $state(10);
	const textureChannel = new THREE.TextureLoader().load(rertroBg);
	// make texture repeat
	textureChannel.wrapS = THREE.RepeatWrapping;
	textureChannel.wrapT = THREE.RepeatWrapping;
	textureChannel.repeat.set(4, 4);

	const noiseTexture = new THREE.TextureLoader().load(noise);

	const uniforms = {
		iTime: { value: 0 },
		iResolution: { value: new THREE.Vector3() },
		iChannel0: { value: textureChannel },
		iChannel1: { value: noiseTexture }
	};

	const canvas = document.createElement('canvas');

	$effect(() => {
		if (open) {
			tweenProgress.set(0.2);
		} else {
			tweenProgress.set(-1.6);
		}
	});

	$effect(() => {
		if (scaleToOne) {
			scaleProgress.set(1);
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

	$effect(() => {
		if ($gltf) {
			setTimeout(() => {
				scaleToOne = true;
				setTimeout(() => {
					open = true;
				}, 500);
			}, 500);
		}
	});

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

	useTask((delta) => {
		// pointer is current cursor position
		uniforms.iTime.value += delta * 0.4;
		uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
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

<T.Group bind:ref scale={scaleProgress.current} dispose={false as never} {...props as any}>
	{#await gltf}
		<HTML center>
			<div in:fade={{ delay: 1000 }} class="flex w-36 flex-col items-center gap-4">
				<p>loading 3D model...</p>
				<svg
					fill="currentColor"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							dur="0.75s"
							values="0 12 12;360 12 12"
							repeatCount="indefinite"
						/>
					</path>
				</svg>
			</div>
		</HTML>
	{:then gltf}
		<T.Group name="Cube002_106" position={[0, 0.47, 0]} rotation={[0, 0, -0.02]}>
			<T.Mesh
				name="touchpad"
				geometry={gltf.nodes.Object_9.geometry}
				onpointerover={() => {
					$hovering = true;
				}}
				onpointerout={() => {
					$hovering = false;
				}}
				onclick={(e: TEvent) => {
					e.stopPropagation();
					retro = !retro;
				}}
			>
				{#if $hovering}
					<!-- use gltf.material.monitor material -->
					<T.MeshStandardMaterial
						color={$mode === 'dark' ? 0x000000 : 0xffffff}
						transparent
						roughness={0.0}
						metalness={0.0}
						opacity={1}
					/>
				{:else if retro}
					<T.MeshStandardMaterial
						color={$mode === 'dark' ? 0x333333 : 0xffffff}
						transparent
						roughness={0.65}
						metalness={0.7}
						opacity={1}
					/>
				{:else}
					<T.ShaderMaterial {fragmentShader} {vertexShader} {uniforms} />
				{/if}
			</T.Mesh>
			<T.Mesh
				name="space"
				geometry={gltf.nodes.Object_11.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 0.09]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.88]}
			/>

			<T.Mesh
				name="Object_13"
				geometry={gltf.nodes.Object_13.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 2.02]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.18]}
			/>
			<T.Mesh
				name="Object_15"
				geometry={gltf.nodes.Object_15.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, -1.84]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.34]}
			/>
			<T.Mesh
				name="Object_17"
				geometry={gltf.nodes.Object_17.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, 1.57]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_19"
				geometry={gltf.nodes.Object_19.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, 1.97]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.24]}
			/>
			<T.Mesh
				name="Object_21"
				geometry={gltf.nodes.Object_21.geometry}
				material={gltf.materials['Material.012']}
				position={[1.28, -0.16, -1.85]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.32]}
			/>
			<T.Mesh
				name="Object_23"
				geometry={gltf.nodes.Object_23.geometry}
				material={gltf.materials['Material.012']}
				position={[0.55, -0.09, 2.08]}
				rotation={[0, 0, -0.1]}
				scale={[0.07, 0.03, 0.12]}
			/>
			<T.Mesh
				name="Object_25"
				geometry={gltf.nodes.Object_25.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, 1.69]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_27"
				geometry={gltf.nodes.Object_27.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, -0.94]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_29"
				geometry={gltf.nodes.Object_29.geometry}
				material={gltf.materials['Material.012']}
				position={[1.8, -0.22, -2.05]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_31"
				geometry={gltf.nodes.Object_31.geometry}
				material={gltf.materials['Material.012']}
				position={[1.73, -0.21, -1.77]}
				rotation={[0, 0, -0.1]}
				scale={[0.06, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_33"
				geometry={gltf.nodes.Object_33.geometry}
				material={gltf.materials['Material.012']}
				position={[1.86, -0.22, -1.77]}
				rotation={[0, 0, -0.1]}
				scale={[0.06, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_35"
				geometry={gltf.nodes.Object_35.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, 1.89]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.32]}
			/>
			<T.Mesh
				name="Object_37"
				geometry={gltf.nodes.Object_37.geometry}
				material={gltf.materials['Material.012']}
				position={[1.53, -0.19, 1.42]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_39"
				geometry={gltf.nodes.Object_39.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, 1.64]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_41"
				geometry={gltf.nodes.Object_41.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, 2]}
				rotation={[0, 0, -0.1]}
				scale={[0.11, 0.03, 0.2]}
			/>
			<T.Mesh
				name="Object_43"
				geometry={gltf.nodes.Object_43.geometry}
				material={gltf.materials['Material.012']}
				position={[1.02, -0.14, -1.96]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.22]}
			/>
			<T.Mesh
				name="Object_45"
				geometry={gltf.nodes.Object_45.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, 1.75]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.13]}
			/>
			<T.Mesh
				name="Object_47"
				geometry={gltf.nodes.Object_47.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, 2.05]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.16]}
			/>
			<T.Mesh
				name="Object_49"
				geometry={gltf.nodes.Object_49.geometry}
				material={gltf.materials['Material.012']}
				position={[0.76, -0.11, -1.91]}
				rotation={[0, 0, -0.1]}
				scale={[0.12, 0.03, 0.27]}
			/>
		</T.Group>
		<T.Group
			bind:ref={monitor}
			name="monitor"
			position={[0.07, 0.45, 0]}
			rotation={[0, 0, tweenProgress.current]}
		>
			<T.Mesh
				name="Object_27_1"
				geometry={gltf.nodes.Object_27_1.geometry}
				material={gltf.materials['Material.007']}
				onpointerover={() => {
					$monitorHovering = true;
				}}
				onpointerout={() => {
					$monitorHovering = false;
				}}
				onclick={(e: TEvent) => {
					e.stopPropagation();
					open = !open;
				}}
			/>
			<T.Mesh name="Object_27_2" geometry={gltf.nodes.Object_27_2.geometry}>
				{#if retro}
					<T.ShaderMaterial {fragmentShader} {vertexShader} {uniforms} />
				{:else}
					<T.MeshStandardMaterial
						color={$mode === 'dark' ? 0x000000 : 0xffffff}
						transparent
						roughness={0.65}
						metalness={0.7}
						opacity={1}
					/>
				{/if}
			</T.Mesh>
			<T.Group rotation={[0, Math.PI / 2, 0]} position={[0.15, 1.6, 0]}>
				<HTML pointerEvents="painted" rotation={[0.1, 0, 0]} scale={0.3} transform>
					{#if open}
						<div class="grid text-left">
							<div class="layer1 collapse [grid-column:1] [grid-row:1]">
								{@render children?.()}
							</div>
							<div
								class="layer2 text-xs [grid-column:1] [grid-row:1]"
								onintroend={() => {
									speed = 50;
								}}
								in:typewriter={{ speed }}
							>
								{@render children?.()}
							</div>
						</div>
					{/if}
				</HTML>
			</T.Group>
		</T.Group>
		<T.Mesh
			name="Object_8"
			geometry={gltf.nodes.Object_8.geometry}
			material={gltf.materials['Material.001']}
			position={[0, 0.45, 0]}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}
</T.Group>
