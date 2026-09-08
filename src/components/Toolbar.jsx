import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import ViewToggle from '@/components/ViewToggle';

/**
 * Toolbar ligger ovanför job-list. Vänster: filterblocken (department-filter,
 * location-filter, type-filter) som redaktören lägger i fältet `items`.
 * Höger: "Visa som: Kort / Lista" (alltid med, ej ett Storyblok-block).
 *
 * Aktiva värden (department/q/ort/typ/view) kommer via props och skickas vidare
 * till varje filter så att de kan förifyllas.
 */
const Toolbar = ({
	blok,
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = 'kort',
}) => (
	<div className="toolbar" {...storyblokEditable(blok)}>
		<div className="toolbar__filters">
			{blok.items?.map((nestedBlok) => (
				<StoryblokServerComponent
					blok={nestedBlok}
					key={nestedBlok._uid}
					department={department}
					q={q}
					ort={ort}
					typ={typ}
					view={view}
				/>
			))}
		</div>

		<ViewToggle view={view} params={{ department, q, ort, typ }} />
	</div>
);

export default Toolbar;
