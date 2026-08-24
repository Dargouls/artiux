'use client';

import { useState } from 'react';

import { Aside } from '@/artiux/components/aside';
import { Breadcrumb } from '@/artiux/components/breadcrumb';
import Button from '@/components/button/button';
import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, ControlSlider, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'customize', label: 'Customizar' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

const fakeFolders = ['relatorios', 'financeiro', '2026', 'agosto'];
const variants = ['ghost', 'contained'] as const;
const animations = ['bounce', 'slide'] as const;

export default function BreadcrumbComponent() {
	const [fakeSegments, setFakeSegments] = useState<string[]>(['app', 'relatorios']);
	const [intercept, setIntercept] = useState(true);
	const [variant, setVariant] = useState<(typeof variants)[number]>('ghost');
	const [animation, setAnimation] = useState<(typeof animations)[number]>('bounce');
	const [speed, setSpeed] = useState(1);

	const fakePathname = '/' + fakeSegments.join('/');

	const entrarPasta = () => {
		const next = fakeFolders[fakeSegments.length - 1];
		if (!next) return;
		setFakeSegments((prev) => [...prev, next]);
	};

	const voltar = () => {
		setFakeSegments((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
	};

	const resetar = () => setFakeSegments(['app', 'relatorios']);

	const irParaHref = (href: string) => {
		const segments = href.split('/').filter(Boolean);
		setFakeSegments(segments);
	};

	const props = [
		`pathname='${fakePathname}'`,
		intercept ? 'onNavigate={handleNavigate}' : null,
		variant !== 'ghost' ? `variant='${variant}'` : null,
		animation !== 'bounce' ? `animation='${animation}'` : null,
		speed !== 1 ? `speed={${speed}}` : null,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { Breadcrumb } from '@/artiux/components/breadcrumb';

<Breadcrumb ${props} />
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Breadcrumb</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>
						Trilha de navegação gerada automaticamente a partir do caminho da URL atual
					</p>

					<p className='mt-8'>
						Por padrão lê o <code>pathname</code> real com <code>usePathname</code> e monta os itens a partir dos segmentos da URL. Com
						menos de dois segmentos, não renderiza nada (com animação de saída). Os botões abaixo simulam navegação sem sair da página —
						nenhum clique aqui navega de verdade.
					</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<div className='flex flex-col items-center gap-6'>
							<Breadcrumb
								pathname={fakePathname}
								onNavigate={intercept ? irParaHref : undefined}
								variant={variant}
								animation={animation}
								speed={speed}
							/>

							<div className='flex flex-wrap justify-center gap-2'>
								<Button className='w-max' onClick={entrarPasta} disabled={!fakeFolders[fakeSegments.length - 1]}>
									Entrar em pasta
								</Button>
								<Button className='w-max' variant='outlined' onClick={voltar} disabled={fakeSegments.length <= 1}>
									Voltar
								</Button>
								<Button className='w-max' variant='text' onClick={resetar}>
									Resetar
								</Button>
							</div>

							<p className='text-muted-foreground text-xs'>Pathname simulado: {fakePathname}</p>
						</div>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlDropdown label='Variant' value={variant} options={variants} onChange={setVariant} />
						<ControlDropdown label='Animation' value={animation} options={animations} onChange={setAnimation} />
						<ControlSlider label='Speed' value={speed} min={0.25} max={3} step={0.25} unit='x' onChange={setSpeed} />
						<ControlSwitch label='onNavigate (interceptar cliques)' checked={intercept} onChange={setIntercept} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode code={componentCode} fileName='artiux/components/breadcrumb/index.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{
		property: 'pathname',
		type: 'string',
		description: 'Sobrescreve o pathname real (usePathname). Útil em sandbox/preview.',
	},
	{
		property: 'onNavigate',
		type: '(href: string) => void',
		description: 'Quando definido, cliques num item chamam isso em vez de navegar de verdade.',
	},
	{
		property: 'variant',
		type: "'ghost' | 'contained'",
		default: "'ghost'",
		description: 'Estilo visual dos itens: texto simples ou pill com bg-primary/30.',
	},
	{
		property: 'animation',
		type: "'bounce' | 'slide'",
		default: "'bounce'",
		description: "'bounce': spring com bounce. 'slide': tween sóbrio, sem opacity, entra por trás do item anterior.",
	},
	{
		property: 'speed',
		type: 'number',
		default: '1',
		description: 'Multiplicador de velocidade das transições (2 = 2x mais rápido, 0.5 = metade da velocidade).',
	},
];

const componentCode = `
'use client';

import { AnimatePresence, motion, Transition } from 'motion/react';
import { usePathname } from 'next/navigation';

import { Icon } from '@/artiux/components/icons';
import { Link } from '@/components/link';
import { cn } from '@/lib/utils';

const animationPresets = {
	bounce: {
		nav: {
			initial: { height: 0, scale: 0.9 },
			animate: { height: 'auto', scale: 1 },
			exit: { height: 0, scale: 0.9 },
			transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
		},
		item: {
			initial: { x: -16, scale: 0.7 },
			animate: { x: 0, scale: 1 },
			exit: { x: -16, scale: 0.7, opacity: 0 },
			transition: { type: 'spring', bounce: 0.55, duration: 0.45 },
			exitTransition: { type: 'tween', ease: 'easeOut', duration: 0.2 },
		},
	},
	slide: {
		nav: {
			initial: { height: 0 },
			animate: { height: 'auto' },
			exit: { height: 0 },
			transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
		},
		item: {
			initial: { x: -24 },
			animate: { x: 0 },
			exit: { x: -24 },
			transition: { type: 'tween', ease: 'easeOut', duration: 0.28 },
			exitTransition: { type: 'tween', ease: 'easeIn', duration: 0.2 },
		},
	},
} as const;

function scaleTransition(transition: Transition, speed: number): Transition {
	const duration = (transition as { duration?: number }).duration;
	return duration ? { ...transition, duration: duration / speed } : transition;
}

function humanizeSegment(segment: string) {
	return segment
		.replace(/-/g, ' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.trim()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export interface BreadcrumbProps {
	pathname?: string;
	onNavigate?: (href: string) => void;
	variant?: 'ghost' | 'contained';
	animation?: 'bounce' | 'slide';
	speed?: number;
}

export function Breadcrumb({
	pathname: pathnameProp,
	onNavigate,
	variant = 'ghost',
	animation = 'bounce',
	speed = 1,
}: BreadcrumbProps) {
	const realPathname = usePathname();
	const pathname = pathnameProp ?? realPathname;
	const segments = pathname.split('/').filter(Boolean);
	const visible = segments.length >= 2;
	const preset = animationPresets[animation];

	const navTransition = scaleTransition(preset.nav.transition, speed);
	const itemTransition = scaleTransition(preset.item.transition, speed);
	const itemExitTransition = scaleTransition(preset.item.exitTransition, speed);

	const items = segments.map((segment, index) => ({
		label: humanizeSegment(segment),
		href: '/' + segments.slice(0, index + 1).join('/'),
	}));

	return (
		<AnimatePresence>
			{visible && (
				<motion.nav
					key='breadcrumb'
					initial={preset.nav.initial}
					animate={preset.nav.animate}
					exit={preset.nav.exit}
					transition={navTransition}
					className={cn('text-muted-foreground mt-20 flex items-center overflow-hidden text-sm')}
					aria-label='Breadcrumb'
				>
					<AnimatePresence initial={false} mode='popLayout'>
						{items.map((item, index) => {
							const isLast = index === items.length - 1;

							return (
								<motion.span
									key={item.href}
									layout
									className='relative flex items-center gap-2'
									style={animation === 'slide' ? { zIndex: items.length - index } : undefined}
								>
									{/* Camada isolada da animação de entrada/saída — não conflita com o reflow do layout */}
									<motion.span
										initial={preset.item.initial}
										animate={preset.item.animate}
										exit={{ ...preset.item.exit, transition: itemExitTransition }}
										transition={itemTransition}
										className='flex items-center gap-2'
									>
										{/* Separador */}
										{index > 0 && <Icon icon='chevron-right' className='size-3.5' />}

										{isLast ? (
											<span
												className={cn(
													'text-foreground font-medium',
													variant === 'contained' && 'bg-primary/10 text-primary rounded-md px-3 py-1'
												)}
											>
												{item.label}
											</span>
										) : onNavigate ? (
											<button
												type='button'
												onClick={() => onNavigate(item.href)}
												className={cn(
													'appearance-none border-0 bg-transparent p-0 tracking-wider outline-none',
													'hover:text-foreground cursor-pointer transition-colors',
													variant === 'contained' && 'bg-primary/5 text-primary hover:bg-primary/10 rounded-md px-3 py-1'
												)}
											>
												{item.label}
											</button>
										) : (
											<Link
												href={item.href}
												variant='ghost'
												className={cn(
													'hover:text-foreground',
													variant === 'contained' && 'bg-primary/5 text-primary hover:bg-primary/10 rounded-md px-3 py-1'
												)}
											>
												{item.label}
											</Link>
										)}
									</motion.span>
								</motion.span>
							);
						})}
					</AnimatePresence>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}
`;
