'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Children, useEffect, useState } from 'react';

const colors = ['bg-white', 'bg-black', 'bg-black', 'bg-white'];

interface MovingSquaresProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function MovingSquares({ children, ...props }: MovingSquaresProps) {
	// Define em qual posição (0 a 3) está cada cor
	const [positionsOfColors, setPositionsOfColors] = useState([0, 1, 2, 3]);
	console.log('filhos: ', children);
	useEffect(() => {
		const interval = setInterval(() => {
			setPositionsOfColors((prev) => {
				const newPositions = [...prev];
				newPositions[0] = prev[1];
				newPositions[1] = prev[3];
				newPositions[3] = prev[2];
				newPositions[2] = prev[0];
				return newPositions;
			});
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const gap = '0.25rem';

	// posições relativas em %
	const relativePositions = [
		{ top: '25%', left: '25%' }, // quadrante 0
		{ top: '25%', left: '75%' }, // quadrante 1
		{ top: '75%', left: '25%' }, // quadrante 2
		{ top: '75%', left: '75%' }, // quadrante 3
	];

	const childrenArray = Children.toArray(children);

	return (
		<div {...props} className={cn('relative aspect-square w-20 overflow-hidden', props.className)}>
			{positionsOfColors.map((pos, colorIndex) => (
				<motion.div
					key={colorIndex}
					animate={{
						top: relativePositions[pos].top,
						left: relativePositions[pos].left,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					transition={{
						type: 'spring',
						stiffness: 450,
						damping: 30,
					}}
					style={{
						width: `calc(50% - ${gap})`,
						height: `calc(50% - ${gap})`,
						transform: 'translate(-50%, -50%)',
					}}
					className={`absolute rounded-md`}
				>
					{childrenArray[colorIndex]}
				</motion.div>
			))}
		</div>
	);
}
