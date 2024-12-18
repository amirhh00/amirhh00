declare module 'https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js' {
	const mustache: {
		render: (template: string, data: Record<string, unknown>) => string;
	};
	export default mustache;
}
