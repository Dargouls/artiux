'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Tabs } from '@/artiux-components/tabs';

const defaultValues = ['1', '2', '3', '4'] as const;

export default function TabsComponent() {
	const [defaultValue, setDefaultValue] = useState<(typeof defaultValues)[number]>('1');

	const tabs = [
		{
			title: 'Criar',
			value: '1',
			content: (
				<div className='bg-card text-card-foreground rounded-xl p-4'>
					<h1 className='text-lg font-semibold'>Criar</h1>
				</div>
			),
		},
		{
			title: 'Listar',
			value: '2',
			content: (
				<div className='bg-card text-card-foreground rounded-xl p-4'>
					<h1 className='text-lg font-semibold'>Listar</h1>
				</div>
			),
		},
		{
			title: 'Atualizar',
			value: '3',
			content: (
				<div className='bg-card text-card-foreground rounded-xl p-4'>
					<h1 className='text-lg font-semibold'>Atualizar</h1>
				</div>
			),
		},
		{
			title: 'Deletar',
			value: '4',
			content: (
				<div className='bg-card text-card-foreground rounded-xl p-4'>
					<h1 className='text-lg font-semibold'>Deletar</h1>
				</div>
			),
		},
	];

	const props = [`defaultValue='${defaultValue}'`].filter(Boolean).join(' ');

	const previewCode = `
import { Tabs } from '@/artiux-components/tabs';

const tabs = [
	{ title: 'Criar', value: '1', content: <h1>Criar</h1> },
	{ title: 'Listar', value: '2', content: <h1>Listar</h1> },
	{ title: 'Atualizar', value: '3', content: <h1>Atualizar</h1> },
	{ title: 'Deletar', value: '4', content: <h1>Deletar</h1> },
];

<Tabs tabs={tabs} ${props} />
`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Tabs</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Abas animadas, já responsivas para mobile</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add motion' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<Tabs tabs={tabs} defaultValue={defaultValue} key={defaultValue} />
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlDropdown label='Default value' value={defaultValue} options={defaultValues} onChange={setDefaultValue} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{ property: 'tabs', type: 'Tab[]', description: 'Lista de abas, cada uma com title, value e content.' },
	{ property: 'defaultValue', type: 'string', description: 'Valor da aba selecionada inicialmente (usa a primeira aba se ausente).' },
	{ property: 'onTabChange', type: '(tab: Tab) => void', description: 'Chamado quando a aba ativa é alterada.' },
	{ property: 'containerClassName', type: 'string', description: 'Classes aplicadas ao container das abas.' },
	{ property: 'activeTabClassName', type: 'string', description: 'Classes aplicadas ao indicador da aba ativa.' },
	{ property: 'tabClassName', type: 'string', description: 'Classes aplicadas a cada botão de aba.' },
	{ property: 'contentClassName', type: 'string', description: 'Classes aplicadas ao container do conteúdo exibido.' },
];

const componentCode = `
'use client';

import { Text, textVariants } from '@/artiux-components/text';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

export type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
};

export interface TabsProps {
	tabs: Tab[];
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
	contentClassName?: string;
	onTabChange?: (tab: Tab) => void;
	defaultValue?: string;
}

/**
 * @description Já está responsivo para mobile
 */

export function Tabs({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
	onTabChange,
	defaultValue,
}: TabsProps) {
	const initialTab = defaultValue ? propTabs.find((tab) => tab.value === defaultValue) || propTabs[0] : propTabs[0];
	const [active, setActive] = useState<Tab>(initialTab);
	const [tabs, setTabs] = useState<Tab[]>(propTabs);

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
		onTabChange?.(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<>
			<div
				className={cn(
					'relative flex w-full max-w-full flex-nowrap items-center justify-start',
					'overflow-x-auto overflow-y-hidden',
					'scrollbar-none',
					'touch-pan-x overscroll-x-contain',
					'will-change-transform',
					textVariants({ typography: 'action' }),
					containerClassName
				)}
			>
				{propTabs.map((tab, idx) => (
					<button
						key={tab.title}
						onPointerUp={() => moveSelectedTabToTop(idx)}
						className={cn('relative shrink-0 rounded-xl px-4 py-2 outline-none', tabClassName)}
						onMouseEnter={() => setHovering(true)}
						onMouseLeave={() => setHovering(false)}
						style={{
							transformStyle: 'preserve-3d',
						}}
					>
						{active.value === tab.value && (
							<motion.div
								layoutId='clickedbutton'
								transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
								className={cn('bg-primary/15 absolute inset-0 rounded-xl', activeTabClassName)}
							/>
						)}

						<Text typography={active.value === tab.value ? 'action' : 'caption'} className={cn('text-primary relative block')}>
							{tab.title}
						</Text>
					</button>
				))}
			</div>
			<FadeInDiv tabs={tabs} active={active} key={active.value} hovering={hovering} className={cn('', contentClassName)} />
		</>
	);
}

export const FadeInDiv = ({ tabs, className }: { className?: string; key?: string; tabs: Tab[]; active: Tab; hovering?: boolean }) => {
	return <div className={cn('relative h-full w-full', className)}>{tabs[0].content}</div>;
};
`;
