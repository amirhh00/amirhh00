import type * as THREE from 'three';

export type TEvent = THREE.Intersection & {
	intersections: THREE.Intersection[]; // The first intersection of each intersected object
	object: THREE.Object3D; // The object that was actually hit
	eventObject: THREE.Object3D; // The object that registered the event
	camera: THREE.Camera; // The camera used for raycasting
	delta: THREE.Vector2; //  Distance between mouse down and mouse up event in pixels
	nativeEvent: MouseEvent | PointerEvent | WheelEvent; // The native browser event
	pointer: THREE.Vector2; // The pointer position in normalized device coordinates
	ray: THREE.Ray; // The ray used for raycasting
	stopPropagation: () => void; // Function to stop propagation of the event
	stopped: boolean; // Whether the event propagation has been stopped
};
