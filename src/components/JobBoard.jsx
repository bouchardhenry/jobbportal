import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/**
 * JobBoard är layout-blocket som delar jobs-sidan i två spalter:
 *  - content: toolbar + job-list (vänster, brett)
 *  - aside:   popular-categories + employer-cta (höger, smalt)
 *
 * Båda fälten är Blocks-fält (nestable) i Storyblok, så redaktören bestämmer
 * exakt vilka block som ligger var. department/q/ort/typ/view skickas vidare
 * via ...restProps ända ner till filter och lista.
 */
const JobBoard = ({ blok, ...restProps }) => (
	<div className="job-board" {...storyblokEditable(blok)}>
		<div className="job-board__content">
			{blok.content?.map((nestedBlok) => (
				<StoryblokServerComponent
					blok={nestedBlok}
					key={nestedBlok._uid}
					{...restProps}
				/>
			))}
		</div>

		<aside className="job-board__aside">
			{blok.aside?.map((nestedBlok) => (
				<StoryblokServerComponent
					blok={nestedBlok}
					key={nestedBlok._uid}
					{...restProps}
				/>
			))}
		</aside>
	</div>
);

export default JobBoard;
