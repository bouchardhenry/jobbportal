import { storyblokEditable } from '@storyblok/react/rsc';

/**
 * Fritextsök. GET-formulär som lägger ?q=... i URL:en.
 * `department` skickas med som dolt fält så att ett aktivt avdelningsfilter
 * behålls när man söker (filter + sök ska fungera samtidigt).
 *
 * Används i Hero-blocket. Kan även ligga som eget `search-bar`-block i en toolbar.
 */
const SearchBar = ({ blok = {}, department = '', q = '' }) => (
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

		{/* Behåll aktivt avdelningsfilter vid sökning */}
		{department ? (
			<input type="hidden" name="department" value={department} />
		) : null}

		<button type="submit">Sök jobb</button>
	</form>
);

export default SearchBar;
