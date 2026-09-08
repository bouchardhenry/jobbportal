'use client';

/**
 * Liten klientkomponent: en <select> som skickar sitt GET-formulär direkt när
 * värdet ändras. Låter filtren se ut som i designen (bara dropdowns, ingen
 * knapp) medan själva datahämtningen ligger kvar i server-komponenten runt om.
 * Utan JS fungerar den dolda submit-knappen i formuläret som reserv.
 */
export default function AutoSubmitSelect({
	name,
	defaultValue,
	ariaLabel,
	children,
}) {
	return (
		<select
			name={name}
			defaultValue={defaultValue}
			aria-label={ariaLabel}
			onChange={(event) => event.currentTarget.form.requestSubmit()}
		>
			{children}
		</select>
	);
}
