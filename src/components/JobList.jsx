import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

/**
 * JobList är ett Storyblok-block (Nestable). Det ligger i body på "jobs"-storyn
 * och ansvarar för att hämta OCH rendera listan med jobb.
 * jobs/page.jsx innehåller alltså ingen listlogik – samma mönster som bloggen i L4.
 *
 * `blok` är blockets egna fält från Storyblok (t.ex. en valfri rubrik).
 */
const JobList = async ({ blok }) => {
	const storyblokApi = getStoryblokApi();

	// 1. Hämta alla jobbannonser i mappen jobs/ som har content type "job-post".
	const { data } = await storyblokApi.get('cdn/stories', {
		version: STORYBLOK_VERSION,
		starts_with: 'jobs/',
		content_type: 'job-post',
		is_startpage: false, // uteslut mappens egen startsida (den är en "page")
		sort_by: 'content.publishedAt:desc',
	});
	const jobs = data.stories;

	// 2. Hämta avdelningarna från datasourcen för att visa läsbara namn
	//    ("utveckling" -> "Utveckling") istället för det sparade slug-värdet.
	const { data: dsData } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});
	const departmentNames = Object.fromEntries(
		dsData.datasource_entries.map((entry) => [entry.value, entry.name]),
	);

	return (
		<section {...storyblokEditable(blok)} className="job-list">
			<h1>{blok.heading || 'Lediga jobb'}</h1>

			{jobs.length === 0 ? (
				<p>Inga jobb matchade.</p>
			) : (
				<ul className="job-list__grid">
					{jobs.map((job) => (
						<li key={job.uuid} className="job-card">
							<span className="job-card__dept">
								{departmentNames[job.content.department] ||
									job.content.department}
							</span>
							<h2 className="job-card__title">
								{/* job.full_slug är t.ex. "jobs/frontend-utvecklare" */}
								<Link href={`/${job.full_slug}`}>{job.content.title}</Link>
							</h2>
							<p className="job-card__summary">{job.content.summary}</p>
							<p className="job-card__meta">{job.content.location}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default JobList;
