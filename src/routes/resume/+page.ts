import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return redirect(301, '/resume/frontend-software-engineer');
};
