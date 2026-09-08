import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';
import HiddenParams from '@/components/HiddenParams';
import AutoSubmitSelect from '@/components/AutoSubmitSelect';

/**
 * Ort-filter. Det finns ingen datakälla för orter – i stället läser vi ut alla
 * unika `location`-värden från publicerade jobbannonser och bygger listan av dem.
 * Valet hamnar i URL:en som ?ort=... .
 */
const LocationFilter = async ({
	blok,
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = '',
}) => {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories', {
		version: STORYBLOK_VERSION,
		starts_with: 'jobs/',
		content_type: 'job-post',
		is_startpage: false,
		per_page: 100,
	});

	const locations = [
		...new Set(
			data.stories
				.map((story) => story.content.location?.trim())
				.filter(Boolean),
		),
	].sort((a, b) => a.localeCompare(b, 'sv'));

	const label = blok.label || 'Ort';

	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__filter"
			{...storyblokEditable(blok)}
		>
			<label htmlFor="location-select">{label}</label>
			<AutoSubmitSelect name="ort" defaultValue={ort} ariaLabel={label}>
				<option value="">{label}</option>
				{locations.map((location) => (
					<option key={location} value={location}>
						{location}
					</option>
				))}
			</AutoSubmitSelect>

			<HiddenParams
				except="ort"
				department={department}
				q={q}
				typ={typ}
				view={view}
			/>
			<button type="submit">Filtrera</button>
		</form>
	);
};

export default LocationFilter;
