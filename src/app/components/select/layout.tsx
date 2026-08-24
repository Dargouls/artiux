import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Select',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
