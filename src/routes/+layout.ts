import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
import { PUBLIC_IGNORE_ANALYTICS } from '$env/static/public';
export const prerender = true;
export const ssr = false;
if (!dev && !PUBLIC_IGNORE_ANALYTICS) injectAnalytics({ mode: dev ? 'development' : 'production' });
