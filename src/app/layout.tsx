import Header from '@/components/layout/header/header';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Libre_Baskerville, Poppins, Sen } from 'next/font/google';

import './globals.css';

import TransitionWrapper from '@/components/layout/transitionWrapper/transitionWrapper';
import { ViewTransitions } from 'next-view-transitions-gabriel-azv';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const baskerfille = Libre_Baskerville({
	variable: '--font-libre_baskerville',
	subsets: ['latin'],
	weight: ['400'], // Add the desired weights as needed
});

const sen = Sen({
	variable: '--font-sen',
	subsets: ['latin'],
});
const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ArtIux',
	description: 'Biblioteca de componentes hiperanimados para React',
	openGraph: {
		title: 'ArtIux',
		description: 'Biblioteca de componentes animados para Next.js',
		url: 'https://artiux.vercel.app/',
		siteName: 'ArtIux',
		type: 'website',
		images: [
			{
				url: '/image.png',
				width: 1200,
				height: 630,
				alt: 'ArtIux - Biblioteca de componentes animados para Next.js',
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang='pt-BR'>
				<body
					className={`device-overflow ${geistSans.variable} ${geistMono.variable} ${sen.variable} ${poppins.variable} ${baskerfille.variable} antialiased`}
				>
					<TransitionWrapper>
						<Header />

						{children}
					</TransitionWrapper>
					<Toaster position='bottom-center' />
					<Analytics />
				</body>
			</html>
		</ViewTransitions>
	);
}
