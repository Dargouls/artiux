import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Radio Group',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
