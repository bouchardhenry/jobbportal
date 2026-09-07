import { redirect } from 'next/navigation';

/**
 * Startsidan. Jobbportalen har ingen egen landningssida – skicka besökaren
 * vidare till jobblistan. En explicit /-route går före catch-all-routen
 * [[...slug]], så blueprintens gamla "home"-story används inte längre.
 */
export default function HomePage() {
	redirect('/jobs');
}
