import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

export const metadata = {
	title: 'Lediga jobb',
};

/**
 * Listvyn /jobs.
 * Sidan hämtar bara "index"-storyn för mappen jobs/ och lämnar renderingen till
 * Storyblok. Storyns body innehåller ett "job-list"-block som i sin tur hämtar
 * och visar själva listan. Ingen listmarkup eller datahämtning för jobben här.
 */
export default async function JobsPage() {
	const storyblokApi = getStoryblokApi();

	// "cdn/stories/jobs" pekar på mappens startsida (root for the folder).
	const { data } = await storyblokApi.get('cdn/stories/jobs', {
		version: STORYBLOK_VERSION,
	});

	return <StoryblokStory story={data.story} />;
}
