import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Radio Compose',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
