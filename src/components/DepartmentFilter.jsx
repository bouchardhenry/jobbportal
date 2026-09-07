import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

/**
 * Avdelningsfilter. Ett vanligt GET-formulär – ingen JavaScript på klienten.
 * Vid submit hamnar valet i URL:en som ?department=... som jobs/page.jsx läser.
 *
 * `department` = aktivt filter (förifyller dropdownen).
 * `q` = aktiv sökterm; läggs med som dolt fält så att en sökning inte
 *        nollställs när man byter avdelning.
 */
const DepartmentFilter = async ({ blok, department = '', q = '' }) => {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});
	const entries = data.datasource_entries;

	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__filter"
			{...storyblokEditable(blok)}
		>
			<label htmlFor="department-select">{blok.label || 'Avdelning'}</label>
			<select
				id="department-select"
				name="department"
				defaultValue={department}
			>
				<option value="">Alla avdelningar</option>
				{entries.map((entry) => (
					<option key={entry.value} value={entry.value}>
						{entry.name}
					</option>
				))}
			</select>

			{/* Behåll aktiv sökning vid filtrering */}
			{q ? <input type="hidden" name="q" value={q} /> : null}

			<button type="submit">Filtrera</button>
		</form>
	);
};

export default DepartmentFilter;
