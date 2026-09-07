import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

/**
 * JobList är ett Storyblok-block (Nestable). Det ligger i body på "jobs"-storyn
 * och ansvarar för att hämta OCH rendera listan med jobb.
 * jobs/page.jsx innehåller alltså ingen listlogik – samma mönster som bloggen i L4.
 *
 * Props:
 *  - blok        blockets egna fält (t.ex. valfri rubrik)
 *  - department  aktivt avdelningsfilter från ?department= (VG)
 *  - q           aktiv sökterm från ?q= (VG)
 */
const JobList = async ({ blok, department = '', q = '' }) => {
	const storyblokApi = getStoryblokApi();

	// Bygg API-parametrarna. Filter och sök läggs på villkorligt så att en tom
	// toolbar ger hela listan.
	const params = {
		version: STORYBLOK_VERSION,
		starts_with: 'jobs/',
		content_type: 'job-post',
		is_startpage: false, // uteslut mappens egen startsida (den är en "page")
		sort_by: 'content.publishedAt:desc',
	};

	// filter_query[department][in]=<value> – matchar det sparade datasource-värdet
	if (department) {
		params.filter_query = { department: { in: department } };
	}

	// search_term – Storybloks fritextsök över storyns fält
	if (q) {
		params.search_term = q;
	}

	const { data } = await storyblokApi.get('cdn/stories', params);
	const jobs = data.stories;

	// Läsbara avdelningsnamn ("utveckling" -> "Utveckling") från datasourcen.
	const { data: dsData } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});
	const departmentNames = Object.fromEntries(
		dsData.datasource_entries.map((entry) => [entry.value, entry.name]),
	);

	const isFiltered = Boolean(department || q);

	return (
		<section {...storyblokEditable(blok)} className="job-list">
			<h1>{blok.heading || 'Lediga jobb'}</h1>

			<p className="job-list__count">
				{jobs.length} {jobs.length === 1 ? 'jobb' : 'jobb'}
				{isFiltered ? (
					<>
						{' '}
						&middot; <Link href="/jobs">Rensa filter</Link>
					</>
				) : null}
			</p>

			{jobs.length === 0 ? (
				<p>Inga jobb matchade din sökning.</p>
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
