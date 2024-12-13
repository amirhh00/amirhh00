const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'] as const;
const videoExtensions = ['mp4', 'webm', 'ogg'] as const;

/**
 * Get type of media from its source whether it is an image or video
 * @param src string to get media type from
 */
export function getMediaType(
	src: string,
	imgExt = imageExtensions,
	vidExt = videoExtensions
): 'image' | 'video' | 'unknown' {
	const extension = src.split('.').pop() as string;
	if (imgExt.includes(extension as (typeof imageExtensions)[number])) return 'image';
	if (vidExt.includes(extension as (typeof videoExtensions)[number])) return 'video';
	return 'unknown';
}
