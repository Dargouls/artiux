'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Text } from '@/artiux-components/text';

const typographies = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'subtitle-1',
	'subtitle-2',
	'body',
	'description-1',
	'description-2',
	'action',
	'caption',
] as const;

export default function TextComponent() {
	const [typography, setTypography] = useState<(typeof typographies)[number]>('body');

	const props = [`typography='${typography}'`].filter(Boolean).join(' ');

	const previewCode = `
import { Text } from '@/artiux-components/text';

<Text ${props}>Text</Text>
`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Text</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um componente de texto com variantes tipográficas</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex flex-col items-start gap-2'>
						{typographies.map((t) => (
							<Text key={t} typography={t}>
								Text
							</Text>
						))}
					</div>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlDropdown label='Typography' value={typography} options={typographies} onChange={setTypography} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Variantes:</h3>
				<div className='mt-4 flex flex-col items-start gap-2'>
					<Text typography='h1'>Headline 1</Text>
					<Text typography='h2'>Headline 2</Text>
					<Text typography='h3'>Headline 3</Text>
					<Text typography='h4'>Headline 4</Text>
					<Text typography='h5'>Headline 5</Text>
					<Text typography='subtitle-1'>Subtitle 1</Text>
					<Text typography='subtitle-2'>Subtitle 2</Text>
					<Text typography='body'>Body</Text>
					<Text typography='description-1'>Description 1</Text>
					<Text typography='description-2'>Description 2</Text>
					<Text typography='action'>Action</Text>
					<Text typography='caption'>Caption</Text>
				</div>
			</section>
		</>
	);
}

const propRows = [
	{
		property: 'typography',
		type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'subtitle-1' | 'subtitle-2' | 'body' | 'description-1' | 'description-2' | 'action' | 'caption'",
		default: "'body'",
		description: 'Variante tipográfica aplicada, também define a tag HTML renderizada.',
	},
	{ property: 'className', type: 'string', description: 'Classes adicionais aplicadas ao elemento.' },
];

const componentCode = `
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementType } from 'react';

export type TextComponent =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'subtitle-1'
	| 'subtitle-2'
	| 'body'
	| 'description-1'
	| 'description-2'
	| 'action'
	| 'caption';

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
	typography?: TextComponent;
}

export const textVariants = cva('', {
	variants: {
		typography: {
			h1: 'text-2xl font-bold',
			h2: 'text-2xl font-semibold',
			h3: 'text-xl font-semibold',
			h4: 'text-base font-semibold',
			h5: 'text-xs font-medium',
			'subtitle-1': 'text-lg font-medium',
			'subtitle-2': 'text-base font-medium',
			body: 'text-base font-normal',
			'description-1': 'text-sm font-normal',
			'description-2': 'text-xs font-normal',
			action: 'text-base font-semibold tracking-wider',
			caption: 'text-base font-medium',
		},
	},
	defaultVariants: {
		typography: 'body',
	},
});

const tagMap: Record<TextComponent, ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	'subtitle-1': 'h6',
	'subtitle-2': 'h6',
	body: 'p',
	'description-1': 'p',
	'description-2': 'p',
	action: 'span',
	caption: 'small',
};

export function Text({ typography = 'body', className, ...props }: TextProps) {
	const Component = tagMap[typography];

	return <Component {...props} className={cn(textVariants({ typography: typography }), className)} />;
}
`;
