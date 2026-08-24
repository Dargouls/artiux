'use client';

import logoMini from '@/assets/brand/logo-mini.svg';
import logo from '@/assets/brand/logo.svg';

import { NavItem, Sidebar } from '@/artiux/components/sidebar';
import { componentsNavItems } from '@/data/components-nav';

interface SidebarWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SidebarWrapper({ children, ...props }: SidebarWrapperProps) {
	const navItems: NavItem[] = [
		{
			type: 'header',
			logo: logo,
			logoMini: logoMini,
			href: '/components',
		},
		{
			label: 'Primeiros Passos',
			type: 'group',
			items: [
				{
					label: 'Utils',
					href: '/components/utils',
				},
			],
		},
		{
			label: 'Componentes',
			type: 'group',
			href: '/components',
			items: componentsNavItems,
		},
		{
			label: 'Transições',
			type: 'group',
			items: [
				{
					label: 'To Left',
					href: '/components/to-left',
				},
				{
					label: 'Circle Transition',
					href: '/components/circle-transition',
				},
			],
		},
	];

	return (
		<>
			<Sidebar.Provider navItems={navItems} collapsible='none'>
				{children}
			</Sidebar.Provider>
		</>
	);
}
