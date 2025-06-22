'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CircularProgress from '../circularProgress/circularProgress';

interface Bubble {
	id: number;
	left: number;
	color: string;
	delay: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	loading: boolean;
}

export default function BubbleButton({ loading, children, ...props }: ButtonProps) {
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [isCoolingDown, setIsCoolingDown] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		animateButton();
	};

	const animateButton = () => {
		if (isCoolingDown) return;

		setIsCoolingDown(true);

		const timestamp = Date.now();
		const newBubbles: Bubble[] = Array.from({ length: 10 }).map((_, i) => ({
			id: timestamp + i,
			left: Math.random() * 100,
			color: 'bg-white',
			delay: i * 0.05,
		}));

		setBubbles((prev) => [...prev, ...newBubbles]);

		// Remover bolhas após a animação
		setTimeout(() => {
			setBubbles((prev) => prev.slice(newBubbles.length));
		}, 1200);

		// Throttle por 300ms
		setTimeout(() => {
			setIsCoolingDown(false);
		}, 300);
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				'active:translate-0 relative flex items-center gap-1 overflow-hidden rounded border border-white px-6 py-2 font-mono tracking-wider text-white transition-all duration-100 active:shadow-none disabled:brightness-75',
				'[&:hover:not(:disabled):not(:active)]:-translate-y-0.5',
				'[&:hover:not(:disabled):not(:active)]:shadow-[4px_4px_0_0_#fff]',
				props.className
			)}
			disabled={loading || props.disabled}
		>
			{children}
			{loading && <CircularProgress size={20} color='white' />}

			{bubbles.map((bubble) => (
				<motion.span
					key={bubble.id}
					initial={{ y: 12, scale: 1 }}
					animate={{ y: -60, scale: 1.5 }}
					transition={{
						duration: 1,
						ease: 'easeOut',
						delay: bubble.delay,
					}}
					style={{
						left: `${bubble.left}%`,
					}}
					className={`pointer-events-none absolute bottom-0 h-3 w-2 rounded-full blur-[1px] ${bubble.color}`}
				/>
			))}
		</button>
	);
}
