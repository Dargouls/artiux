'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';
import { cn } from '@/lib/utils';

import { CircularProgress } from '@/artiux-components/circularProgress';

const sizes = ['size-8', 'size-12', 'size-16', 'size-24'] as const;
const colors = ['currentColor', 'text-primary', 'text-destructive', 'text-success', 'text-warning'] as const;

export default function CircularProgressComponent() {
	const [size, setSize] = useState<(typeof sizes)[number]>('size-8');
	const [color, setColor] = useState<(typeof colors)[number]>('currentColor');

	const props = [size !== 'size-8' ? size : null, color !== 'currentColor' ? color : null].filter(Boolean).join(' ');

	const previewCode = `
import { CircularProgress } from '@/artiux-components/circularProgress';

<CircularProgress${props ? ` className='${props}'` : ''} />
`;

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
						<CircularProgress className={cn(size, color)} />
						<CircularProgress className='size-12 text-primary' />
						<CircularProgress className='size-16 text-destructive' />
					</div>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlDropdown label='Tamanho' value={size} options={sizes} onChange={setSize} />
					<ControlDropdown label='Cor' value={color} options={colors} onChange={setColor} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{
		property: 'className',
		type: 'string',
		default: "'animate-spinner-rotate size-8'",
		description: 'Classes utilitárias para controlar tamanho e cor (via currentColor) do indicador.',
	},
	{
		property: '...props',
		type: 'React.SVGProps<SVGSVGElement>',
		description: 'Demais atributos SVG nativos são repassados ao elemento raiz.',
	},
];

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
