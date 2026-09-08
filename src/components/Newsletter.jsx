/**
 * Nyhetsbrevs-sektion i sidfoten. Ren markup – ingen inskickning implementerad
 * (formuläret pekar mot en tänkt /api/newsletter-endpoint).
 */
export default function Newsletter() {
	return (
		<section className="newsletter" aria-labelledby="newsletter-heading">
			<svg
				className="newsletter__icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				aria-hidden="true"
			>
				<rect x="2" y="4" width="20" height="16" rx="2" />
				<path d="m2 7 10 6 10-6" />
			</svg>
			<div className="newsletter__body">
				<strong id="newsletter-heading">Få nya jobb direkt</strong>
				<p>
					Prenumerera på vårt nyhetsbrev och få våra senaste
					jobbannonser.
				</p>
			</div>
			<form method="post" action="/api/newsletter">
				<label htmlFor="newsletter-email" className="sr-only">
					E-postadress
				</label>
				<input
					id="newsletter-email"
					type="email"
					name="email"
					placeholder="Din e-post"
					required
				/>
				<button type="submit">Prenumerera</button>
			</form>
		</section>
	);
}
