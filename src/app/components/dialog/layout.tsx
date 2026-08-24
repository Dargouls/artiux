import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dialog',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
