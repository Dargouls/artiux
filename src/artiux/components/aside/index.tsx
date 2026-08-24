'use client';

import { Text } from '@/artiux/components/text';
import { cn } from '@/lib/utils';
import { animate, stagger, utils } from 'animejs';
import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

export type AsideItem = {
	id: string;
	label: string;
};

export interface AsideProps {
	items: AsideItem[];
	title?: string;
	className?: string;
}

const PARTICLE_COUNT = 10;
const PARTICLE_TRAVEL_X: [number, number] = [8, 22];
const PARTICLE_TRAVEL_Y: [number, number] = [-6, 6];
const PARTICLE_DURATION = 500;
const PARTICLE_STAGGER_DELAY = 30;
const PARTICLE_START_DELAY = 100;
const PARTICLE_LOOP: boolean | number = false;

function AsideParticles() {
	const containerRef = useRef<HTMLDivElement>(null);
	const tops = useMemo(() => Array.from({ length: PARTICLE_COUNT }, () => utils.random(5, 95)), []);

	useEffect(() => {
		const els = containerRef.current?.querySelectorAll<HTMLSpanElement>('.aside-particle');
		if (!els || els.length === 0) return;

		const animation = animate(els, {
			translateX: () => utils.random(...PARTICLE_TRAVEL_X),
			translateY: () => utils.random(...PARTICLE_TRAVEL_Y),
			opacity: [
				{ to: 0.9, duration: 200, easing: 'easeOutSine' },
				{ to: 0, duration: 700, easing: 'easeInSine' },
			],
			scale: [
				{ to: 1, duration: 150 },
				{ to: 0.3, duration: 750 },
			],
			duration: PARTICLE_DURATION,
			delay: stagger(PARTICLE_STAGGER_DELAY, { start: PARTICLE_START_DELAY }),
			loop: PARTICLE_LOOP,
		});

		return () => {
			animation.revert();
		};
	}, []);

	return (
		<div ref={containerRef} className='pointer-events-none absolute inset-y-0 left-0 w-6 overflow-visible'>
			{tops.map((top, i) => (
				<span key={i} className='aside-particle bg-primary absolute left-0 size-[3px] rounded-full opacity-0' style={{ top: `${top}%` }} />
			))}
		</div>
	);
}

export function Aside({ items, title = 'Nesta página', className }: AsideProps) {
	const [active, setActive] = useState(items[0]?.id);
	const clickedRef = useRef(false);

	useEffect(() => {
		const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (clickedRef.current) return;

				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: '-20% 0px -70% 0px', threshold: 0 }
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [items]);

	const handleClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		setActive(id);

		clickedRef.current = true;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		window.setTimeout(() => {
			clickedRef.current = false;
		}, 800);
	};

	return (
		<aside className={cn('sticky top-24 hidden w-48 shrink-0 self-start xl:block', className)}>
			<Text typography='caption' className='text-muted-foreground mb-3 block text-sm'>
				{title}
			</Text>
			<nav className='flex flex-col gap-1'>
				{items.map((item) => (
					<a
						key={item.id}
						href={`#${item.id}`}
						onClick={handleClick(item.id)}
						className='relative rounded-lg px-3 py-1.5 text-sm outline-none'
						style={{ transformStyle: 'preserve-3d' }}
					>
						{active === item.id && (
							<motion.div
								layoutId='aside-indicator'
								transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
								className='pointer-events-none absolute inset-0'
							>
								<div className='bg-primary absolute inset-y-0 left-0 w-[2px] rounded-xl' />
								<AsideParticles />
							</motion.div>
						)}

						<span className={cn('relative block truncate', active === item.id ? 'text-foreground font-medium' : 'text-muted-foreground')}>
							{item.label}
						</span>
					</a>
				))}
			</nav>
		</aside>
	);
}
