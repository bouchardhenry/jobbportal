import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import SiteHeader from '@/components/SiteHeader';
import Newsletter from '@/components/Newsletter';

export const metadata = {
	title: 'Jobbportal — Hitta ditt nästa jobb',
	description: 'Lediga jobb – byggd med Storyblok och Next.js',
	manifest: '/site.webmanifest',
	icons: {
		icon: [
			{ url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon.ico',
		apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
	},
};

export const viewport = {
	themeColor: '#e8e6dc',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();
	return (
		<StoryblokProvider>
			<html lang="sv">
				<body>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap"
					/>

					<SiteHeader />
					{children}
					<footer className="site-footer">
						<Newsletter />
						<p className="site-copyright">
							Alla rättigheter förbehållna © {currentYear}
						</p>
					</footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}
