export type MediaFile = {
	url: any;
	type: 'image' | 'video' | 'unknown';
	alt: string;
	captionsUrl: string;
	isVideo?: boolean;
	isImage?: boolean;
};

export type Project = {
	mediaFiles: MediaFile[];
	markdown: string;
	metaData: {
		title: string;
		workedOn: string[];
		tools: string[];
		date: string;
	};
};
