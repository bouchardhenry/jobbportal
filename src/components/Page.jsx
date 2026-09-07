import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/**
 * Renderar en "page"-story genom att loopa dess body-block.
 * `...restProps` skickas vidare till varje block – så att t.ex. department/q
 * (från searchParams i jobs/page.jsx) når ända ner till toolbar och job-list.
 */
const Page = ({ blok, ...restProps }) => (
	<main {...storyblokEditable(blok)}>
		{blok.body?.map((nestedBlok) => (
			<StoryblokServerComponent
				blok={nestedBlok}
				key={nestedBlok._uid}
				{...restProps}
			/>
		))}
	</main>
);

export default Page;
