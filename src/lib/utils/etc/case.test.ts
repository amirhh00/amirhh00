import { camelCase } from './case.ts';
import { assertEquals } from 'jsr:@std/assert';
import { describe, it } from 'jsr:@std/testing/bdd';

describe('camelCase', () => {
	it('should convert kebab-case to camelCase', () => {
		assertEquals(camelCase('kebab-case'), 'kebabCase');
	});

	it('should convert snake_case to camelCase', () => {
		assertEquals(camelCase('snake_case'), 'snakeCase');
	});
	it('should convert camel case to camelCase', () => {
		assertEquals(camelCase('camel case'), 'camelCase');
	});
});
