export const removeH3FromMarkdown = () => {
	/**
	 * @param {import('hast').Root} tree
	 * @param {vFile} file
	 *   Tree.
	 * @returns {undefined}
	 */
	return (tree, file) => {
		if (file.filename.includes('/src/static/projects/'))
			tree.children = tree.children.filter((node) => node.tagName !== 'h3');
	};
};
