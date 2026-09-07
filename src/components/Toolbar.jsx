import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

/**
 * Toolbar är en behållare (Nestable block) som ligger på jobs/index ovanför
 * job-list. Den renderar sina inre block (department-filter, search-bar) och
 * skickar vidare department/q så att formulären kan förifyllas.
 */
const Toolbar = ({ blok, ...restProps }) => (
	<div className="toolbar" {...storyblokEditable(blok)}>
		{blok.items?.map((nestedBlok) => (
			<StoryblokServerComponent
				blok={nestedBlok}
				key={nestedBlok._uid}
				{...restProps}
			/>
		))}
	</div>
);

export default Toolbar;
