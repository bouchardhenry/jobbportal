import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';

export const metadata = {
	title: 'Jobbportal',
	description: 'Lediga jobb – byggd med Storyblok och Next.js',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();
	return (
		<StoryblokProvider>
			<html lang="sv">
				<body>
					{children}
					<footer>All rights reserved © {currentYear} </footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}
