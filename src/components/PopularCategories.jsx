import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getJobDepartments } from '@/lib/storyblok';

/**
 * Sidopanel "Populära kategorier". Listan byggs från datakällan
 * `job-departments` och varje rad länkar till listan förfiltrerad på den
 * kategorin (/jobs?department=...).
 *
 * Storyblok-fält:
 *  - heading (Text)   rubrik (valfri)
 *  - limit   (Number) hur många som visas (valfri, default 5)
 */
const PopularCategories = async ({ blok }) => {
	const all = await getJobDepartments();
	const limit = Number(blok.limit) > 0 ? Number(blok.limit) : 5;
	const entries = all.slice(0, limit);

	return (
		<section className="panel" {...storyblokEditable(blok)}>
			<h2 className="panel__heading">
				{blok.heading || 'Populära kategorier'}
			</h2>
			<ul className="category-list">
				{entries.map((entry) => (
					<li key={entry.value}>
						<Link href={`/jobs?department=${encodeURIComponent(entry.value)}`}>
							<span>{entry.name}</span>
							<svg
								viewBox="0 0 24 24"
								width="14"
								height="14"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default PopularCategories;
