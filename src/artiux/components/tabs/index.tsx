'use client';

import { Text, textVariants } from '@/artiux/components/text';
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
