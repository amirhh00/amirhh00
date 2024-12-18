import type ffmpeg from 'ffmpeg';

type MediaType = 'image' | 'video' | 'unknown';

export type MediaFileBase = {
	url: string;
	alt: string;
	type: MediaType;
	isVideo?: boolean;
	isImage?: boolean;
	aspect?: {
		x: number;
		y: number;
		value: number;
	};
};

export type ImageMediaFile = {
	thumbnail: string;
	metadata: import('sharp').Metadata;
};

export type VideoMediaFile = {
	poster?: string;
	captionsUrl?: string;
	metadata: Awaited<InstanceType<typeof ffmpeg>>['metadata'];
};

export type MediaFile = MediaFileBase & (ImageMediaFile | VideoMediaFile);

export type Project = {
	mediaFiles: MediaFile[];
	markdown: string;
	metadata: {
		title: string | string[];
		workedOn: string[];
		tools: string[];
		date: string;
	};
};
