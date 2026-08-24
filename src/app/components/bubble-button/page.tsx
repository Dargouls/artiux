'use client';

import { useState } from 'react';

import { Aside } from '@/artiux/components/aside';
import BubbleButton from '@/artiux/components/bubbleButton';
import CopyCode from '@/components/copyCode/copyCode';
import { ControlSlider, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import { Heart } from 'lucide-react';

import PreviewCode from '@/components/previewCode/previewCode';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

export default function BubbleButtonComponent() {
	const [loading, setLoading] = useState(false);
	const [svgDuration, setSvgDuration] = useState(2);
	const [svgDelay, setSvgDelay] = useState(0.05);

	const props = [
		loading ? 'loading' : 'loading={false}',
		svgDuration !== 2 ? `svgDuration={${svgDuration}}` : null,
		svgDelay !== 0.05 ? `svgDelay={${svgDelay}}` : null,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { Heart } from 'lucide-react';

<BubbleButton ${props} bubbleIcon={<Heart size={16} color='white' fill='white' />}>
	❤
</BubbleButton>
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Bubble Button</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>Um botão com animação de SVGs flutuantes ao clicar</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<BubbleButton
							loading={loading}
							svgDuration={svgDuration}
							svgDelay={svgDelay}
							bubbleIcon={<Heart size={16} color='white' fill='white' />}
						>
							❤
						</BubbleButton>
						<BubbleButton
							className='ml-2'
							loading={loading}
							svgDuration={svgDuration}
							svgDelay={svgDelay}
							bubbleIcon={<Heart size={16} color='white' fill='white' />}
						>
							Componentes
						</BubbleButton>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlSwitch label='Loading' checked={loading} onChange={setLoading} />
						<ControlSlider label='SVG duration' value={svgDuration} min={0.5} max={5} step={0.5} unit='s' onChange={setSvgDuration} />
						<ControlSlider label='SVG delay' value={svgDelay} min={0} max={0.5} step={0.05} unit='s' onChange={setSvgDelay} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add motion' code={dialogCode} fileName='artiux/components/bubbleButton.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{ property: 'loading', type: 'boolean', description: 'Exibe indicador de carregamento e desabilita o botão.' },
	{
		property: 'bubbleIcon',
		type: 'React.ReactNode',
		description: 'Ícone/elemento exibido em cada bolha animada. Se omitido, usa uma bolha branca padrão.',
	},
	{ property: 'svgDuration', type: 'number', default: '2', description: 'Duração base (em segundos) da animação de subida das bolhas.' },
	{
		property: 'svgDelay',
		type: 'number',
		default: '0.05',
		description: 'Intervalo (em segundos) entre o início da animação de cada bolha.',
	},
];

const dialogCode =
	`
'use client';

import CircularProgress from '@/components/circularProgress/circularProgress';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Bubble {
	id: number;
	left: number;
	delay: number;
	initialRotation: number;
	rotationDuration: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	loading: boolean;
	bubbleIcon?: React.ReactNode;
	svgDuration?: number;
	svgDelay?: number;
}

export default function BubbleButton({
	loading,
	svgDelay = 0.05,
	svgDuration = 2,
	children,
	bubbleIcon,
	...props
}: ButtonProps) {
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [isCoolingDown, setIsCoolingDown] = useState(false);

	const animateButton = () => {
		if (isCoolingDown) return;

		setIsCoolingDown(true);

		const timestamp = Date.now();
		const newBubbles: Bubble[] = Array.from({ length: 10 }).map((_, i) => ({
			id: timestamp + i,
			left: Math.random() * 100,
			delay: i * svgDelay,
			initialRotation: Math.random() * 360,
			rotationDuration: svgDuration + Math.random() * svgDuration,
		}));

		setBubbles((prev) => [...prev, ...newBubbles]);

		setTimeout(() => {
			setBubbles((prev) => prev.slice(newBubbles.length));
		}, 1200);

		setTimeout(() => {
			setIsCoolingDown(false);
		}, 300);
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		props.onClick?.(e);
		animateButton();
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				'relative flex items-center gap-1 overflow-hidden rounded border border-white px-6 py-2 font-mono tracking-wider text-white transition-all duration-100',
				'disabled:brightness-75',
				'[&:hover:not(:disabled):not(:active)]:-translate-y-0.5',
				'[&:hover:not(:disabled):not(:active)]:shadow-[4px_4px_0_0_#fff]',
				props.className
			)}
			disabled={loading || props.disabled}
		>
			{children}
			{loading && <CircularProgress size={20} color='white' />}

			{bubbles.map((bubble) => (
				<motion.div
					key={bubble.id}
					initial={{
						y: 15,
						scale: 1,
						opacity: 1,
						rotate: bubble.initialRotation,
					}}
					animate={{
						y: -150,
						scale: 1.5,
						opacity: 0,
						rotate: bubble.initialRotation + 360,
					}}
					transition={{
						duration: bubble.rotationDuration,
						ease: 'easeOut',
						delay: bubble.delay,
					}}
					style={{
` +
	'						left: `${bubble.left}%`,' +
	`					}}
					className='pointer-events-none absolute bottom-0 flex items-center justify-center'
				>
					{bubbleIcon ?? <div className='h-3 w-2 rounded-full bg-white blur-[1px]' />}
				</motion.div>
			))}
		</button>
	);
}
`;
