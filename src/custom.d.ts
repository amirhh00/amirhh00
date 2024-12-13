declare module '*.md' {
	const content: ConstructorOfATypedSvelteComponent | Component<any, any, any> | null | undefined;
	export default content;
}
