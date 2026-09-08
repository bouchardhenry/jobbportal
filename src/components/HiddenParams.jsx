/**
 * Hjälpkomponent: renderar dolda input-fält för alla aktiva query-parametrar
 * UTOM den som det aktuella formuläret själv styr (`except`).
 *
 * Varje filter är ett eget GET-formulär, så utan detta skulle t.ex. en aktiv
 * sökterm försvinna när man byter avdelning.
 */
const HiddenParams = ({ except, department = '', q = '', ort = '', typ = '', view = '' }) => {
	// view=kort är standardläget – bär bara med parametern när den avviker (lista),
	// så URL:erna hålls rena.
	const all = { department, q, ort, typ, view: view === 'kort' ? '' : view };
	return (
		<>
			{Object.entries(all)
				.filter(([key, value]) => key !== except && value)
				.map(([key, value]) => (
					<input key={key} type="hidden" name={key} value={value} />
				))}
		</>
	);
};

export default HiddenParams;
