'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { CheckboxComposeItem } from '@/artiux-components/checkboxCompose';

export default function CheckboxComposeComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Checkbox Compose</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					Um card de checkbox com título, descrição, imagem e ação opcionais
				</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add radix-ui' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex w-full max-w-md flex-col gap-4'>
						<CheckboxComposeItem
							title='Item 1'
							description='Descrição'
							actionName='Visualizar'
							action={() => console.log(1)}
							image='/image.png'
						/>
						<CheckboxComposeItem title='Item 2' description='Sem imagem e sem ação' />
						<CheckboxComposeItem title='Item 3' description='Desabilitado' disabled />
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { CheckboxComposeItem } from '@/artiux-components/checkboxCompose';

<CheckboxComposeItem
	title='Item 1'
	description='Descrição'
	actionName='Visualizar'
	action={() => console.log(1)}
	image='/image.png'
/>
`;

const componentCode = `
import { cn } from '@/lib/utils';
import * as React from 'react';

import Image, { StaticImageData } from 'next/image';
import * as CheckboxPrimitive from 'radix-ui/checkbox';
import { Button } from '../button';
import { Icon } from '../icons';
import { textVariants } from '../text';

export interface CheckboxComposeItemProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
	title: string;
	description?: string;
	actionName?: string;
	action?: () => void;
	image?: string | StaticImageData;
	customNode?: React.ReactNode;
}

function CheckboxComposeItem({ title, description, actionName, image, customNode, action, ...props }: CheckboxComposeItemProps) {
	return (
		<>
			<CheckboxPrimitive.Root
				data-slot='checkbox'
				className={cn(
					'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive group relative flex w-full flex-col justify-center gap-2 rounded-3xl border-2 p-4 outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
					'data-[state=checked]:border-primary',
					props.className
				)}
				{...props}
			>
				<div className='flex gap-2'>
					<div className='flex w-full flex-col gap-2'>
						<div className='flex items-center gap-2'>
							<div
								className={cn(
									'border-input flex aspect-square size-6 w-max items-center justify-center rounded-[8px] border',
									'group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground'
								)}
							>
								<CheckboxPrimitive.Indicator data-slot='checkbox-indicator' className='grid place-content-center transition-all'>
									<Icon icon='check' className='size-4' />
								</CheckboxPrimitive.Indicator>
							</div>

							<span className={cn(textVariants({ typography: 'subtitle-2' }))}>{title}</span>
						</div>
						{description && (
							<p className={cn('text-emphasis-low text-left', textVariants({ typography: 'description-2' }))}>{description}</p>
						)}
					</div>

					{image && <Image className='rounded-xl' src={image} alt='title' width={44} height={44} />}
				</div>
				{actionName && (
					<Button className='w-full' variant='secondary' size='sm' onClick={(e) => (e.stopPropagation(), action && action())}>
						{actionName}
					</Button>
				)}
				<div>{customNode}</div>
			</CheckboxPrimitive.Root>
		</>
	);
}

export { CheckboxComposeItem };
`;
