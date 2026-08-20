'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface BubbleBurstProps {
	targetRef: React.RefObject<HTMLElement>;
}

export function BubbleBurst({ targetRef }: BubbleBurstProps) {
	const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
	const [timestamp, setTimestamp] = useState(0); // Forçar rerender

	const radius = 30;
	const limiarAngle = 8;

	useEffect(() => {
		const el = targetRef.current;
		if (!el) return;

		const handleClick = (e: MouseEvent) => {
			setOrigin({ x: e.clientX, y: e.clientY });
			setTimestamp(Date.now());
		};

		el.addEventListener('click', handleClick);
		return () => el.removeEventListener('click', handleClick);
	}, [targetRef]);

	if (!origin) return null;

	return (
		<>
			{Array.from({ length: 8 }).map((_, i) => {
				const angle = (Math.PI * 2 * i) / limiarAngle;
				const dx = Math.cos(angle) * radius;
				const dy = Math.sin(angle) * radius;

				return (
					<motion.div
						key={timestamp + '-' + i}
						initial={{
							scale: 1,
							x: 0,
							y: 0,
						}}
						animate={{
							x: dx,
							y: dy,
							scale: 0,
						}}
						transition={{
							type: 'spring',
							stiffness: 140,
							damping: 16,
							delay: i * 0.02,
						}}
						className='pointer-events-none fixed z-50 bg-green-500'
						style={{
							width: 10,
							height: 10,
							borderRadius: '9999px',
							top: targetRef.current.offsetTop + targetRef.current.offsetHeight / 2,
							left: targetRef.current.offsetLeft + targetRef.current.offsetWidth / 2,
						}}
					/>
				);
			})}
		</>
	);
}
