/**
 * listify a metadata value if it contains a comma
 * @param value value of a metadata
 * @returns an array of strings if the value contains a comma, otherwise a single string
 */
export function MetaDataListify(value: string): string[] | string {
	if (value.includes(',')) {
		return value.split(',').flatMap((tool) => (tool ? tool.trim() : []));
	}
	return value.trim();
}

export function extractMarkdownMetadata<T = Record<string, unknown>>(markdownText: string): T {
	const meta = markdownText.match(/---\n([\s\S]*?)\n---/);
	if (!meta) return {} as T;
	const metaString = meta[1];
	const metaObject = metaString.split('\n').reduce((acc, line) => {
		const [key, value] = line.split(':');
		if (key && value) {
			if (value.includes(',')) {
				return {
					...acc,
					[key.trim()]: MetaDataListify(value)
				};
			}
			return {
				...acc,
				[key.trim()]: value.trim()
			};
		}
		return acc;
	}, {} as T);
	return metaObject;
}

/**
 * listify all metadata values if they contain a comma in the values
 * @param metadata an object of metadata
 * type of return is the same except for the keys that are either a string or an array of strings
 */
export function metadataToListify<T = Record<string, unknown>>(
	metadata: T
): { [K in keyof T]: T[K] extends string ? string | string[] : T[K] } {
	return Object.entries(metadata as Record<string, unknown>).reduce(
		(acc, [key, value]) => {
			if (typeof value === 'string' && value.includes(',')) {
				return {
					...acc,
					[key]: MetaDataListify(value)
				};
			}
			return {
				...acc,
				[key]: value
			};
		},
		{} as { [K in keyof T]: T[K] extends string ? string | string[] : T[K] }
	);
}

export function omitMetaDataFromMarkdown(markdownText: string): string {
	return markdownText.replace(/---\n([\s\S]*?)\n---/, '').trim();
}
