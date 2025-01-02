export function typewriter(node: HTMLElement, { speed = 1, delay = 0 }) {
	// Get all text nodes recursively
	const textNodes: Text[] = [];
	const walk = (node: Node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			textNodes.push(node as Text);
		} else {
			node.childNodes.forEach(walk);
		}
	};
	walk(node);

	// Calculate total text length
	const text = textNodes.map((node) => node.textContent || '').join('');
	if (!text) return { duration: 0, tick: () => {} };

	const originalContents = textNodes.map((node) => node.textContent);
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		delay,
		tick: (t: number) => {
			const totalChars = Math.trunc(text.length * t);
			let charCount = 0;

			textNodes.forEach((node, i) => {
				const originalText = originalContents[i] || '';
				if (charCount >= totalChars) {
					node.textContent = '';
				} else if (charCount + originalText.length <= totalChars) {
					node.textContent = originalText;
				} else {
					const nodeChars = totalChars - charCount;
					node.textContent = originalText.slice(0, nodeChars);
				}
				charCount += originalText.length;
			});
		}
	};
}
