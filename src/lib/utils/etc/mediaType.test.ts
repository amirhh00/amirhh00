import { getMediaType } from './mediaType.ts';
import { assertEquals } from 'jsr:@std/assert';
import { describe, it } from 'jsr:@std/testing/bdd';

describe('getMediaType', () => {
	it('should return image for image source', () => {
		assertEquals(getMediaType('long/long/path/to/image.jpg'), 'image');
	});

	it('should return video for video source', () => {
		assertEquals(getMediaType('video.mp4'), 'video');
	});

	it('should return unknown for unknown source', () => {
		assertEquals(getMediaType('something.pdf'), 'unknown');
	});
});
