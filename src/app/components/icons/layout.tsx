import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Icons',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
