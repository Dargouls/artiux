'use client';

import logoMini from '@/assets/brand/logo-mini.svg';
import logo from '@/assets/brand/logo.svg';

import { NavItem, Sidebar } from '@/artiux-components/sidebar';

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
			items: [
				{
					label: 'Dialog',
					href: '/components/dialog',
				},
				{
					label: 'Bubble Button',
					href: '/components/bubble-button',
				},
				{
					label: 'Step Form',
					href: '/components/step-form',
				},
				{
					label: 'Ripple Container',
					href: '/components/ripple-container',
				},
				// {
				// 	label: 'Sidebar',
				// 	href: '/components/sidebar',
				// },
				// {
				// 	label: 'Mouse Trail',
				// 	href: '/components/mouse-trail',
				// },
			],
		},
		{
			label: 'Transições',
			type: 'group',
			items: [
				{
					label: 'To Left',
					href: '/components/to-left',
				},
			],
		},
	];

	return (
		<>
			<Sidebar.Provider navItems={navItems} collapsible='none'>
				<>{children}</>
			</Sidebar.Provider>
		</>
	);
}
