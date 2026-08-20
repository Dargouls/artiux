'use client';

import logoMini from '@/assets/brand/logo-mini.svg';
import logo from '@/assets/brand/logo.svg';

import { NavItem, Sidebar } from '@/artiux/components/sidebar';

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
					label: 'Badge',
					href: '/components/badge',
				},
				{
					label: 'Bubble Button',
					href: '/components/bubble-button',
				},
				{
					label: 'Button',
					href: '/components/button',
				},
				{
					label: 'Button Group',
					href: '/components/buttonGroup',
				},
				{
					label: 'Calendar',
					href: '/components/calendar',
				},
				{
					label: 'Card',
					href: '/components/card',
				},
				{
					label: 'Checkbox Compose',
					href: '/components/checkboxCompose',
				},
				{
					label: 'Circular Progress',
					href: '/components/circularProgress',
				},
				{
					label: 'Dialog',
					href: '/components/dialog',
				},
				{
					label: 'Drawer',
					href: '/components/drawer',
				},
				{
					label: 'Icon Button',
					href: '/components/iconButton',
				},
				{
					label: 'Icons',
					href: '/components/icons',
				},
				{
					label: 'Input Number',
					href: '/components/inputNumber',
				},
				{
					label: 'Multi Select',
					href: '/components/multiSelect',
				},
				{
					label: 'Progress Bar',
					href: '/components/progressBar',
				},
				{
					label: 'Radio Compose',
					href: '/components/radioCompose',
				},
				{
					label: 'Radio Group',
					href: '/components/radioGroup',
				},
				{
					label: 'Ripple Container',
					href: '/components/ripple-container',
				},
				{
					label: 'Select',
					href: '/components/select',
				},
				{
					label: 'Step Form',
					href: '/components/step-form',
				},
				{
					label: 'Switch',
					href: '/components/switch',
				},
				{
					label: 'Tabs',
					href: '/components/tabs',
				},
				{
					label: 'Text',
					href: '/components/text',
				},
				{
					label: 'Text Field',
					href: '/components/textField',
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
				<>{children}</>
			</Sidebar.Provider>
		</>
	);
}
