import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Icon Button',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
