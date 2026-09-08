import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';

/**
 * Sidopanel "Är du arbetsgivare?" – uppmaning att lägga upp en annons.
 *
 * Storyblok-fält:
 *  - heading    (Text)  rubrik
 *  - text       (Textarea)  brödtext
 *  - buttonLabel(Text)  knapptext
 *  - link       (Link)   dit knappen går
 */
function resolveLink(link) {
	const raw = link?.url || link?.cached_url || '';
	if (!raw) return '/lagg-upp-jobb';
	if (/^(https?:)?\/\//.test(raw) || raw.startsWith('/')) return raw;
	return `/${raw}`;
}

const EmployerCta = ({ blok }) => {
	const href = resolveLink(blok.link);

	return (
		<section className="panel employer-cta" {...storyblokEditable(blok)}>
			<svg
				className="employer-cta__icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				aria-hidden="true"
			>
				<rect x="2" y="7" width="20" height="14" rx="2" />
				<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
			</svg>
			<h2 className="employer-cta__heading">
				{blok.heading || 'Är du arbetsgivare?'}
			</h2>
			<p className="employer-cta__text">
				{blok.text || 'Lägg upp en jobbannons på några minuter.'}
			</p>
			<Link href={href} className="employer-cta__button">
				{blok.buttonLabel || 'Kom igång'}
			</Link>
		</section>
	);
};

export default EmployerCta;
