import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tabs',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
