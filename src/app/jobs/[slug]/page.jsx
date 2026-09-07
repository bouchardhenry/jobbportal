import Link from 'next/link';
import { notFound } from 'next/navigation';
import { renderRichText } from '@storyblok/react/rsc';
import { getStoryblokApi, STORYBLOK_VERSION } from '@/lib/storyblok';

/**
 * Hämtar en enskild jobbannons. Bryts ut så att både sidan och metadatan
 * kan använda samma anrop. Kastar vidare felet om storyn inte finns.
 */
async function getJob(slug) {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get(`cdn/stories/jobs/${slug}`, {
		version: STORYBLOK_VERSION,
	});
	return data.story;
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	try {
		const story = await getJob(slug);
		return { title: story.content.title };
	} catch {
		return {};
	}
}

/**
 * Detaljvyn /jobs/[slug].
 * slug är bara sista biten, t.ex. "frontend-utvecklare" -> hämtar "jobs/frontend-utvecklare".
 */
export default async function JobPage({ params }) {
	const { slug } = await params;

	let story;
	try {
		story = await getJob(slug);
	} catch (error) {
		// Storyn saknas (404 från Storyblok) -> visa Next.js not-found-sidan.
		notFound();
	}

	const job = story.content;

	// RichText-fältet kommer som ett JSON-dokument. renderRichText gör om det
	// till en HTML-sträng som vi kan skriva ut (L5 – Sek 1 / Uppg 1).
	const contentHtml = renderRichText(job.content);

	return (
		<main className="job-detail">
			<p>
				<Link href="/jobs">&larr; Alla jobb</Link>
			</p>

			<span className="job-card__dept">{job.department}</span>
			<h1>{job.title}</h1>
			<p className="job-detail__meta">{job.location}</p>
			<p className="job-detail__summary">{job.summary}</p>

			<div
				className="job-detail__body"
				dangerouslySetInnerHTML={{ __html: contentHtml }}
			/>
		</main>
	);
}
