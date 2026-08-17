'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { ProgressBar } from '@/artiux-components/progressBar';

export default function ProgressBarComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Progress Bar</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Uma barra de progresso animada</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex w-full max-w-md flex-col gap-6'>
						<ProgressBar progress={50} labelPosition='right' animated />
						<ProgressBar progress={80} labelPosition='top' animated />
						<ProgressBar progress={30} labelPosition='bottom' animated />
						<ProgressBar progress={65} labelPosition='left' animated />
						<ProgressBar progress={100} labelPosition='none' animated={false} />
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { ProgressBar } from '@/artiux-components/progressBar';

<ProgressBar progress={50} labelPosition='right' animated />
<ProgressBar progress={80} labelPosition='top' animated />
<ProgressBar progress={30} labelPosition='bottom' animated />
<ProgressBar progress={65} labelPosition='left' animated />
<ProgressBar progress={100} labelPosition='none' animated={false} />
`;

const componentCode = `
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
		width: \`\${currentProgress}%\`,
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
`;
