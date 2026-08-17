'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { CircularProgress } from '@/artiux-components/circularProgress';

export default function CircularProgressComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Circular Progress</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um indicador de carregamento circular animado</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex flex-wrap items-center justify-center gap-8'>
						<CircularProgress />
						<CircularProgress className='size-12 text-primary' />
						<CircularProgress className='size-16 text-destructive' />
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { CircularProgress } from '@/artiux-components/circularProgress';

<CircularProgress />
<CircularProgress className='size-12 text-primary' />
`;

const componentCode = `
import { cn } from '@/lib/utils';

interface Props extends React.SVGProps<SVGSVGElement> {}

const CircularProgress = ({ ...props }: Props) => {
	return (
		<svg {...props} viewBox='0 0 50 50' className={cn('animate-spinner-rotate size-8', props.className)}>
			<circle
				cx='25'
				cy='25'
				r='20'
				fill='none'
				stroke='currentColor'
				strokeWidth='4'
				strokeLinecap='round'
				className='animate-spinner-dash'
			/>
		</svg>
	);
};

export { CircularProgress };
`;
