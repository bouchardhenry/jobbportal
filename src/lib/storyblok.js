import Page from '@/components/Page';
import JobList from '@/components/JobList';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

/**
 * Vilken version av innehållet vi hämtar från Storyblok.
 * - I utveckling: 'draft' så opublicerade ändringar syns direkt.
 * - I produktion (Vercel): 'published' – bara publicerat innehåll.
 */
export const STORYBLOK_VERSION =
	process.env.NODE_ENV === 'development' ? 'draft' : 'published';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	/**
	 * Kopplar Storybloks tekniska blocknamn till React-komponenter.
	 * Nyckeln måste vara exakt samma som blockets namn i Storyblok.
	 */
	components: {
		page: Page,
		'job-list': JobList,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
