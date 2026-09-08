import { storyblokEditable } from '@storyblok/react/rsc';
import SearchBar from '@/components/SearchBar';

/**
 * Hero-block högst upp på jobs-storyn: (valfri) etikett, rubrik, ingress,
 * sökfält och en bildyta med perforerad kant.
 *
 * Storyblok-fält:
 *  - eyebrow           (Text)      liten etikett ovanför rubriken, t.ex. "3 nya jobb idag"
 *  - heading           (Text)      stor rubrik
 *  - text              (Textarea)  ingress
 *  - image             (Asset)     bild till höger (valfri – annars platshållare)
 *  - imageTag          (Text)      liten tagg nere i högra hörnet av bilden
 *  - searchPlaceholder (Text)      placeholder i sökfältet
 */
const Hero = ({ blok, q = '', department = '', ort = '', typ = '', view = '' }) => (
	<section className="hero" {...storyblokEditable(blok)}>
		<div className="hero__body">
			{blok.eyebrow ? (
				<span className="hero__eyebrow">{blok.eyebrow}</span>
			) : null}

			<h1 className="hero__title">
				{blok.heading || 'Hitta ditt nästa jobb'}
			</h1>
			<p className="hero__text">
				{blok.text ||
					'Sök bland lediga tjänster inom teknik, design och marknad. Listan uppdateras varje dag med jobb från hela Sverige.'}
			</p>
			<SearchBar
				blok={{ placeholder: blok.searchPlaceholder }}
				q={q}
				department={department}
				ort={ort}
				typ={typ}
				view={view}
			/>
		</div>

		<div className="hero__media">
			{blok.image?.filename ? (
				<img
					src={blok.image.filename}
					alt={blok.image.alt || ''}
					width={640}
					height={440}
				/>
			) : (
				<svg
					viewBox="0 0 24 24"
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
			{blok.imageTag ? (
				<span className="hero__media-tag">{blok.imageTag}</span>
			) : null}
		</div>
	</section>
);

export default Hero;
