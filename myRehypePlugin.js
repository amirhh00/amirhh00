/**
 * rehype plugin to remove h3 from markdown
 * @returns {undefined}
 */
export const removeH3FromMarkdown = () => {
	/**
	 * @param {import('hast').Root} tree
	 *   Tree.
	 * @returns {undefined}
	 */
	return (tree) => {
		tree.children = tree.children.filter((node) => node.tagName !== 'h3');
	};
};
