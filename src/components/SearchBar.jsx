import { storyblokEditable } from '@storyblok/react/rsc';
import HiddenParams from '@/components/HiddenParams';

/**
 * Fritextsök. GET-formulär som lägger ?q=... i URL:en.
 * Aktiva filter (department/ort/typ/view) skickas med som dolda fält så att en
 * sökning inte nollställer dem.
 *
 * Används i Hero-blocket. Kan även ligga som eget `search-bar`-block i en toolbar.
 */
const SearchBar = ({
	blok = {},
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = '',
}) => (
	<form
		method="get"
		action="/jobs"
		role="search"
		className="searchbar"
		{...storyblokEditable(blok)}
	>
		<input
			type="search"
			name="q"
			defaultValue={q}
			placeholder={blok.placeholder || 'Sök jobb, plats eller kompetens'}
			aria-label="Sök jobb"
		/>

		{/* Behåll aktiva filter vid sökning */}
		<HiddenParams
			except="q"
			department={department}
			ort={ort}
			typ={typ}
			view={view}
		/>

		<button type="submit">Sök jobb</button>
	</form>
);

export default SearchBar;
