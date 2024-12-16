import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

export const prerender = true;
export const ssr = false;
if (!dev) injectAnalytics({ mode: dev ? 'development' : 'production' });
