import { cache } from 'react';
import Page from '@/components/Page';
import JobList from '@/components/JobList';
import JobBoard from '@/components/JobBoard';
import Toolbar from '@/components/Toolbar';
import Hero from '@/components/Hero';
import DepartmentFilter from '@/components/DepartmentFilter';
import LocationFilter from '@/components/LocationFilter';
import TypeFilter from '@/components/TypeFilter';
import SearchBar from '@/components/SearchBar';
import PopularCategories from '@/components/PopularCategories';
import EmployerCta from '@/components/EmployerCta';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

/**
 * Vilken version av innehållet vi hämtar från Storyblok.
 * - I utveckling: 'draft' så opublicerade ändringar syns direkt.
 * - I produktion (Vercel): 'published' – bara publicerat innehåll.
 */
export const STORYBLOK_VERSION =
	process.env.NODE_ENV === 'development' ? 'draft' : 'published';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	/**
	 * Kopplar Storybloks tekniska blocknamn till React-komponenter.
	 * Nyckeln måste vara exakt samma som blockets namn i Storyblok.
	 */
	components: {
		page: Page,
		hero: Hero,
		'job-board': JobBoard,
		'job-list': JobList,
		toolbar: Toolbar,
		'department-filter': DepartmentFilter,
		'location-filter': LocationFilter,
		'type-filter': TypeFilter,
		'search-bar': SearchBar,
		'popular-categories': PopularCategories,
		'employer-cta': EmployerCta,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});

/**
 * Datakällan `job-departments` behövs av flera block per sidladdning
 * (department-filter, popular-categories, job-list). cache() ser till att
 * anropet bara görs en gång per render istället för tre.
 */
export const getJobDepartments = cache(async () => {
	const { data } = await getStoryblokApi().get('cdn/datasource_entries', {
		datasource: 'job-departments',
	});
	return data.datasource_entries;
});
