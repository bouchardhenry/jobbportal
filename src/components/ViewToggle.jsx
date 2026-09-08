import Link from 'next/link';

/**
 * "Visa som: Kort / Lista". Två länkar som behåller aktiva filter i URL:en och
 * bara byter ?view=. Ingen klient-JS – samma GET-mönster som filtren.
 *
 * Props:
 *  - view    aktivt läge ('kort' | 'lista')
 *  - params  övriga aktiva query-parametrar { department, q, ort, typ }
 */
const MODES = [
	{ value: 'kort', label: 'Kort' },
	{ value: 'lista', label: 'Lista' },
];

function buildHref(params, view) {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value) search.set(key, value);
	}
	if (view && view !== 'kort') search.set('view', view);
	const qs = search.toString();
	return qs ? `/jobs?${qs}` : '/jobs';
}

const ViewToggle = ({ view = 'kort', params = {} }) => (
	<div className="view-toggle">
		<span>Visa som:</span>
		<span className="view-toggle__group">
			{MODES.map((mode) => (
				<Link
					key={mode.value}
					href={buildHref(params, mode.value)}
					aria-current={view === mode.value}
				>
					{mode.label}
				</Link>
			))}
		</span>
	</div>
);

export default ViewToggle;
