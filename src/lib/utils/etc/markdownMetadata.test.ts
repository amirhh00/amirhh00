import {
	extractMarkdownMetaData,
	MetaDataListify,
	metadataToListify,
	omitMetaDataFromMarkdown
} from './markdownMetadata.ts';
import { assertEquals } from 'jsr:@std/assert';
import { describe, it } from 'jsr:@std/testing/bdd';

describe('extractMarkdownMetaData', () => {
	it('should extract metadata from markdown text', () => {
		const markdownText = `---
workedOn: frontend
tools: HTML, TypeScript
---
# Sample Project`;
		const metaData = extractMarkdownMetaData(markdownText);
		assertEquals(metaData, {
			workedOn: 'frontend',
			tools: ['HTML', 'TypeScript']
		});
	});

	it('should return array for single value with comma', () => {
		const markdownText = `---
workedOn: frontend,
tools: HTML, TypeScript
---
# Sample Project`;
		const metaData = extractMarkdownMetaData(markdownText);
		assertEquals(metaData, {
			workedOn: ['frontend'],
			tools: ['HTML', 'TypeScript']
		});
	});
});

describe('MetaDataListify', () => {
	it('should listify a metadata value if it contains a comma', () => {
		const value = 'HTML, TypeScript';
		const listifiedValue = MetaDataListify(value);
		assertEquals(listifiedValue, ['HTML', 'TypeScript']);
	});

	it('should listify a metadata value if it contains a comma', () => {
		const value = 'HTML,';
		const listifiedValue = MetaDataListify(value);
		assertEquals(listifiedValue, ['HTML']);
	});

	it('should return an empty string if the value is empty', () => {
		const value = '';
		const listifiedValue = MetaDataListify(value);
		assertEquals(listifiedValue, '');
	});

	it('should return a single string if the value does not contain a comma', () => {
		const value = 'HTML';
		const listifiedValue = MetaDataListify(value);
		assertEquals(listifiedValue, 'HTML');
	});
});

describe('metadataToListify', () => {
	it('should listify all metadata values if they contain a comma in the values', () => {
		const metadata = {
			workedOn: 'frontend',
			tools: 'HTML, TypeScript'
		};
		const listifiedMetadata = metadataToListify(metadata);
		assertEquals(listifiedMetadata, {
			workedOn: 'frontend',
			tools: ['HTML', 'TypeScript']
		});
	});

	it('should return array for single value with comma', () => {
		const metadata = {
			workedOn: 'frontend,',
			tools: 'HTML, TypeScript'
		};
		const listifiedMetadata = metadataToListify(metadata);
		assertEquals(listifiedMetadata, {
			workedOn: ['frontend'],
			tools: ['HTML', 'TypeScript']
		});
	});
});

describe('omitMetaDataFromMarkdown', () => {
	it('should omit metadata from markdown text', () => {
		const markdownText = `---
workedOn: frontend
tools: HTML, TypeScript
---
# Sample Project`;
		const omittedMarkdown = omitMetaDataFromMarkdown(markdownText);
		assertEquals(omittedMarkdown, '# Sample Project');
	});
});
