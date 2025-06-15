import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useState } from 'react';

interface MusicBarsProps extends HTMLAttributes<HTMLDivElement> {
	color?: string;
}

export default function MusicBars({ color = '#3B82F6', ...props }: MusicBarsProps) {
	const [heights, setHeights] = useState([30, 50, 40]);

	useEffect(() => {
		const interval = setInterval(() => {
			setHeights([Math.random() * 60 + 20, Math.random() * 60 + 20, Math.random() * 60 + 20]);
		}, 800);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={cn('flex items-end gap-2', props.className)}>
			{heights.map((height, index) => (
				<div
					key={index}
					className='w-4 rounded-t transition-all duration-700 ease-in-out'
					style={{
						height: `${height}px`,
						backgroundColor: color,
					}}
				/>
			))}
		</div>
	);
}
