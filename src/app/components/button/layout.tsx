import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Button',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
