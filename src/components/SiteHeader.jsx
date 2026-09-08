'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Global sidhuvud – logotyp (JP-märke + ordbild) och huvudnavigation.
 * Statiskt "chrome" runt allt innehåll (ligger i layout.js). Klistrig topp.
 * Klientkomponent enbart för att kunna markera aktiv route (usePathname).
 */
const NAV = [
	{ label: 'Hem', href: '/' },
	{ label: 'Jobb', href: '/jobs' },
	{ label: 'Om oss', href: '/om-oss' },
	{ label: 'Kontakt', href: '/kontakt' },
];

export default function SiteHeader() {
	const pathname = usePathname();
	const isActive = (href) =>
		href === '/'
			? pathname === '/'
			: pathname === href || pathname.startsWith(`${href}/`);

	return (
		<header className="site-header">
			<div className="site-header__inner">
				<Link href="/jobs" className="site-header__logo">
					<img
						className="site-header__mark"
						src="/logo-jp.png"
						alt=""
						width={38}
						height={38}
					/>
					<span className="site-header__word">Jobbportal</span>
				</Link>
				<nav className="site-nav" aria-label="Huvudmeny">
					{NAV.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
