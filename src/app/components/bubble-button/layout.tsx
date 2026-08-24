import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Bubble Button',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
