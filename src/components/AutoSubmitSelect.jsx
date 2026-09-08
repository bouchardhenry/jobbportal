'use client';

/**
 * Liten klientkomponent: en <select> som skickar sitt GET-formulär direkt när
 * värdet ändras. Låter filtren se ut som i designen (bara dropdowns, ingen
 * knapp) medan själva datahämtningen ligger kvar i server-komponenten runt om.
 * Utan JS fungerar den dolda submit-knappen i formuläret som reserv.
 */
export default function AutoSubmitSelect({
	id,
	name,
	defaultValue,
	ariaLabel,
	children,
}) {
	return (
		<select
			id={id}
			name={name}
			defaultValue={defaultValue}
			aria-label={ariaLabel}
			onChange={(event) => {
				const form = event.currentTarget.form;
				if (form?.requestSubmit) form.requestSubmit();
				else form?.submit();
			}}
		>
			{children}
		</select>
	);
}
