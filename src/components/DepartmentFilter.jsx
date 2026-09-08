import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import HiddenParams from '@/components/HiddenParams';
import AutoSubmitSelect from '@/components/AutoSubmitSelect';

/**
 * Kategori-/avdelningsfilter. GET-formulär som skickas direkt vid val
 * (AutoSubmitSelect). Valet hamnar i URL:en som ?department=... som
 * jobs/page.jsx läser. Alternativen kommer från datakällan `job-departments`.
 *
 * Övriga aktiva parametrar (q/ort/typ/view) följer med som dolda fält.
 */
const DepartmentFilter = async ({
	blok,
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = '',
}) => {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});
	const entries = data.datasource_entries;
	const label = blok.label || 'Kategori';

	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__filter"
			{...storyblokEditable(blok)}
		>
			<label htmlFor="department-select">{label}</label>
			<AutoSubmitSelect
				name="department"
				defaultValue={department}
				ariaLabel={label}
			>
				<option value="">{label}</option>
				{entries.map((entry) => (
					<option key={entry.value} value={entry.value}>
						{entry.name}
					</option>
				))}
			</AutoSubmitSelect>

			<HiddenParams except="department" q={q} ort={ort} typ={typ} view={view} />
			<button type="submit">Filtrera</button>
		</form>
	);
};

export default DepartmentFilter;
