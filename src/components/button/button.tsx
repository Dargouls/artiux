'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Bubble {
	id: number;
	left: number;
	color: string;
	delay: number;
}

export default function BubbleButton({ children }: { children: React.ReactNode }) {
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [isCoolingDown, setIsCoolingDown] = useState(false);

	const handleClick = () => {
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
			className='active:translate-0 hover:-translate-0.5 relative mt-8 overflow-hidden rounded border border-white px-6 py-2 font-mono tracking-wider text-white transition-all duration-150 hover:shadow-[4px_4px_0_0_#fff] active:shadow-none'
		>
			{children}

			{/* Bolhas com blur */}
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

function getRandomColor() {
	const hue = Math.floor(Math.random() * 360);
	return `hsl(${hue}, 80%, 70%)`;
}
