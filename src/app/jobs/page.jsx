import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

export const metadata = {
	title: 'Lediga jobb',
};

/**
 * Listvyn /jobs.
 * Sidan gör bara två saker:
 *  1. läser filter/sök ur URL:en (searchParams)
 *  2. hämtar "index"-storyn för mappen jobs/ och lämnar renderingen till Storyblok
 *
 * Storyns body innehåller toolbar + job-list. Inga formulär eller listmarkup här –
 * department/q skickas som props ner genom Page -> Toolbar / JobList.
 */
export default async function JobsPage({ searchParams }) {
	// searchParams är en Promise i Next 16
	const sp = await searchParams;
	const department = typeof sp.department === 'string' ? sp.department : '';
	const q = typeof sp.q === 'string' ? sp.q : '';

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories/jobs', {
		version: STORYBLOK_VERSION,
	});

	return (
		<StoryblokStory story={data.story} department={department} q={q} />
	);
}
