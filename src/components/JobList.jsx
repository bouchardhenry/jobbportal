import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import {
	getStoryblokApi,
	getJobDepartments,
	STORYBLOK_VERSION,
} from '@/lib/storyblok';

/**
 * JobList är ett Storyblok-block (Nestable). Det hämtar OCH renderar listan.
 * jobs/page.jsx innehåller alltså ingen listlogik.
 *
 * Props (via searchParams -> Page -> JobBoard -> Toolbar/JobList):
 *  - blok        blockets egna fält (valfri heading)
 *  - department  ?department= – matchas mot content.department (datasource-värde)
 *  - q           ?q=          – Storybloks fritextsök
 *  - ort         ?ort=        – matchas mot content.location
 *  - typ         ?typ=        – matchas mot content.employementType (Storyblok-stavning)
 *  - view        ?view=       – 'kort' (default) eller 'lista'
 */

/** Gör om tags-fältet (array ELLER kommaseparerad text) till en ren array. */
function toTags(value) {
	if (Array.isArray(value)) return value.filter(Boolean);
	if (typeof value === 'string')
		return value
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);
	return [];
}

const JobList = async ({
	blok = {},
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = 'kort',
}) => {
	const storyblokApi = getStoryblokApi();

	const params = {
		version: STORYBLOK_VERSION,
		starts_with: 'jobs/',
		content_type: 'job-post',
		is_startpage: false,
		sort_by: 'content.publishedAt:desc',
		per_page: 100,
	};

	// Bygg ihop alla aktiva filter i ett filter_query-objekt.
	// OBS: job-post-fältet heter "employementType" i Storyblok (felstavat).
	const filterQuery = {};
	if (department) filterQuery.department = { in: department };
	if (ort) filterQuery.location = { in: ort };
	if (typ) filterQuery.employementType = { in: typ };
	if (Object.keys(filterQuery).length) params.filter_query = filterQuery;

	if (q) params.search_term = q;

	const { data } = await storyblokApi.get('cdn/stories', params);
	const jobs = data.stories;

	// Läsbara avdelningsnamn ("utveckling" -> "Utveckling") från datasourcen.
	// getJobDepartments() är cache():ad – delas med department-filter och
	// popular-categories inom samma render.
	const departmentEntries = await getJobDepartments();
	const departmentNames = Object.fromEntries(
		departmentEntries.map((entry) => [entry.value, entry.name]),
	);

	const isFiltered = Boolean(department || q || ort || typ);
	const listClass = view === 'lista' ? 'job-list job-list--lista' : 'job-list';

	return (
		<section {...storyblokEditable(blok)} className={listClass}>
			<p className="job-list__count">
				{String(jobs.length).padStart(3, '0')}{' '}
				{jobs.length === 1 ? 'ledig tjänst' : 'lediga tjänster'}
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
					{jobs.map((job, i) => {
						const c = job.content;
						const tags = toTags(c.tags);
						const type = c.employementType;

						return (
							<li key={job.uuid} className="job-card">
								<span className="job-card__ref">
									{String(i + 1).padStart(3, '0')}
								</span>

								<div className="job-card__media">
									{c.image?.filename ? (
										<img
											src={`${c.image.filename}/m/240x240`}
											alt={c.image.alt || ''}
											width={120}
											height={120}
										/>
									) : (
										<svg
											viewBox="0 0 24 24"
											width="28"
											height="28"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.25"
											aria-hidden="true"
										>
											<rect x="3" y="3" width="18" height="18" rx="2" />
											<circle cx="9" cy="9" r="2" />
											<path d="m21 15-4.5-4.5L7 20" />
										</svg>
									)}
								</div>

								<div className="job-card__body">
									<h2 className="job-card__title">
										<Link href={`/${job.full_slug}`}>{c.title}</Link>
									</h2>
									{c.location || type ? (
										<p className="job-card__meta">
											{c.location}
											{c.location && type ? (
												<span className="dot">·</span>
											) : null}
											{type}
										</p>
									) : null}
									{c.summary ? (
										<p className="job-card__summary">{c.summary}</p>
									) : null}
									{tags.length ? (
										<div className="job-card__tags">
											{tags.map((tag) => (
												<span key={tag} className="tag">
													{departmentNames[tag] || tag}
												</span>
											))}
										</div>
									) : null}
								</div>

								<svg
									className="job-card__chevron"
									viewBox="0 0 24 24"
									width="18"
									height="18"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};

export default JobList;
