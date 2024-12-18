/// <reference types="vite/client"/>
declare module '*.md' {
	const content: ConstructorOfATypedSvelteComponent | Component | null | undefined;
	export default content;
}
