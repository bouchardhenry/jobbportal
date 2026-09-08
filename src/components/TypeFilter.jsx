import { storyblokEditable } from '@storyblok/react/rsc';
import HiddenParams from '@/components/HiddenParams';
import AutoSubmitSelect from '@/components/AutoSubmitSelect';

/**
 * Typ-filter (anställningsform). Alternativen är enkla och ändras sällan, så de
 * ligger som en fallback-lista här. Vill man styra dem från Storyblok kan man
 * fylla i fältet `options` (Textarea, ett värde per rad).
 * Valet hamnar i URL:en som ?typ=... och matchas mot job-post-fältet
 * `employmentType`.
 */
const DEFAULT_OPTIONS = ['Heltid', 'Deltid', 'Konsult', 'Praktik', 'Vikariat'];

const TypeFilter = ({
	blok,
	department = '',
	q = '',
	ort = '',
	typ = '',
	view = '',
}) => {
	const options =
		typeof blok.options === 'string' && blok.options.trim()
			? blok.options
					.split('\n')
					.map((line) => line.trim())
					.filter(Boolean)
			: DEFAULT_OPTIONS;

	const label = blok.label || 'Typ';

	return (
		<form
			method="get"
			action="/jobs"
			className="toolbar__filter"
			{...storyblokEditable(blok)}
		>
			<label htmlFor="type-select">{label}</label>
			<AutoSubmitSelect name="typ" defaultValue={typ} ariaLabel={label}>
				<option value="">{label}</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</AutoSubmitSelect>

			<HiddenParams
				except="typ"
				department={department}
				q={q}
				ort={ort}
				view={view}
			/>
			<button type="submit">Filtrera</button>
		</form>
	);
};

export default TypeFilter;
