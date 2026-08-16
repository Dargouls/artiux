import SidebarWrapper from '@/components/layout/sidebarWrapper/sidebarWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Components | ArtIux',
	description: 'Biblioteca de componentes hiperanimados para React',
};

export default function ComponentsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<SidebarWrapper>
				{children}
				<div className='mt-20'></div>
			</SidebarWrapper>
		</main>
	);
}
