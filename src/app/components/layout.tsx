import { Breadcrumb } from '@/components/breadcrumb';
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
				<Breadcrumb />
				<div className='px-4 md:px-6 lg:px-40'>{children}</div>

				<div className='mt-20'></div>
			</SidebarWrapper>
		</main>
	);
}
