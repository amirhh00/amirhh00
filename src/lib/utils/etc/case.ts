/**
 * turn any string with whitspaces to camelCase
 * @param str  string to convert to camelCase
 * @returns string
 * @example
 * camelCase('camel case') // 'camelCase'
 */
export function camelCase(str: string) {
	return str.replace(/[-_ ](\w)/g, (_, c) => c.toUpperCase());
}
