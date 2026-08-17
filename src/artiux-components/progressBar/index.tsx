'use client';

import { textVariants } from '@/artiux-components/text';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	progress: number;
	animated?: boolean;
	labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'none';
	backgroundClassName?: string;
	fillClassName?: string;
}

export function ProgressBar({
	progress,
	animated = true,
	labelPosition = 'right',
	backgroundClassName,
	fillClassName,
	...props
}: ProgressBarProps) {
	const [currentProgress, setCurrentProgress] = useState(animated ? 0 : progress);

	const normalizedProgress = Math.min(Math.max(progress, 0), 100);

	useEffect(() => {
		if (animated) {
			const t = setTimeout(() => setCurrentProgress(normalizedProgress), 100);
			return () => clearTimeout(t);
		}
		setCurrentProgress(normalizedProgress);
	}, [normalizedProgress, animated]);

	const fillStyle: React.CSSProperties = {
		width: `${currentProgress}%`,
		transition: animated ? 'width 800ms cubic-bezier(0.4,0,0.2,1)' : undefined,
	};

	const Label = <span className={cn('text-primary whitespace-nowrap', textVariants({ typography: 'description-2' }))}>{progress}%</span>;

	return (
		<div className={cn('w-full', props.className)}>
			{/* TOP */}
			{labelPosition === 'top' && <div className='mb-2'>{Label}</div>}

			<div className='flex items-center gap-2'>
				{/* LEFT */}
				{labelPosition === 'left' && Label}

				<div className={cn('bg-primary/15 animate-fade-in relative h-1 flex-1 overflow-hidden rounded-xl', backgroundClassName)}>
					<div className={cn('bg-primary relative h-full rounded-xl', fillClassName)} style={fillStyle}>
						<div className='animate-shimmer absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] bg-[length:200px_100%]' />
					</div>
				</div>

				{/* RIGHT */}
				{labelPosition === 'right' && Label}
			</div>

			{/* BOTTOM */}
			{labelPosition === 'bottom' && <div className='mt-2'>{Label}</div>}
		</div>
	);
}
