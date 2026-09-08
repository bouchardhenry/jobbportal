import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

export const metadata = {
	title: 'Lediga jobb',
};

/**
 * Listvyn /jobs.
 * Sidan gör bara två saker:
 *  1. läser filter/sök/vy ur URL:en (searchParams)
 *  2. hämtar "jobs"-storyn och lämnar renderingen till Storyblok
 *
 * Storyns body innehåller hero + job-board (toolbar, job-list, sidopanel).
 * Alla värden nedan skickas som props genom Page -> blocken.
 */
export default async function JobsPage({ searchParams }) {
	// searchParams är en Promise i Next 16
	const sp = await searchParams;
	const str = (value) => (typeof value === 'string' ? value : '');

	const department = str(sp.department);
	const q = str(sp.q);
	const ort = str(sp.ort);
	const typ = str(sp.typ);
	const view = sp.view === 'lista' ? 'lista' : 'kort';

	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories/jobs', {
		version: STORYBLOK_VERSION,
	});

	return (
		<StoryblokStory
			story={data.story}
			department={department}
			q={q}
			ort={ort}
			typ={typ}
			view={view}
		/>
	);
}
