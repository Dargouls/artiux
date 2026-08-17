'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { RadioComposeItem } from '@/artiux-components/radioCompose';
import { RadioGroup } from '@/artiux-components/radioGroup';

export default function RadioComposeComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Radio Compose</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					Um card de opção de rádio com título, descrição e ação opcionais, para usar dentro de um RadioGroup
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
					<RadioGroup defaultValue='1' className='flex w-full max-w-md flex-col gap-4'>
						<RadioComposeItem title='Item 1' description='Descrição' value='1' actionName='Visualizar' action={() => console.log(1)} />
						<RadioComposeItem title='Item 2' description='Descrição' value='2' actionName='Visualizar' action={() => console.log(2)} />
						<RadioComposeItem title='Item 3' description='Sem ação' value='3' />
					</RadioGroup>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { RadioComposeItem } from '@/artiux-components/radioCompose';
import { RadioGroup } from '@/artiux-components/radioGroup';

<RadioGroup defaultValue='1'>
	<RadioComposeItem title='Item 1' description='Descrição' value='1' actionName='Visualizar' action={() => console.log(1)} />
	<RadioComposeItem title='Item 2' description='Descrição' value='2' actionName='Visualizar' action={() => console.log(2)} />
</RadioGroup>
`;

const componentCode = `
import { cn } from '@/lib/utils';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';
import { Button } from '../button';
import { textVariants } from '../text';

export interface RadioComposeItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
	title: string;
	description?: string;
	actionName?: string;
	action?: () => void;
	value: string;
}

function RadioComposeItem({ title, description, actionName, action, ...props }: RadioComposeItemProps) {
	return (
		<>
			<RadioGroupPrimitive.Item
				data-slot='radio-group-item'
				className={cn(
					'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive group flex w-full flex-col justify-center gap-2 rounded-3xl border-2 p-4 outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
					'data-[state=checked]:border-primary',
					props.className
				)}
				{...props}
			>
				<div className='flex items-center gap-2'>
					<div
						className={cn(
							'border-input flex aspect-square size-6 w-max items-center justify-center rounded-full border',
							'group-data-[state=checked]:border-primary'
						)}
					>
						<RadioGroupPrimitive.Indicator data-slot='radio-group-indicator' className='relative flex items-center justify-center'>
							<div className='bg-primary absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full' />
						</RadioGroupPrimitive.Indicator>
					</div>

					<span className={cn(textVariants({ typography: 'subtitle-2' }))}>{title}</span>
				</div>
				{description && <p className={cn('text-emphasis-low text-left', textVariants({ typography: 'description-2' }))}>{description}</p>}

				{actionName && (
					<Button className='w-full' variant='secondary' size='sm' onClick={(e) => (e.stopPropagation(), action && action())}>
						{actionName}
					</Button>
				)}
			</RadioGroupPrimitive.Item>
		</>
	);
}

export { RadioComposeItem };
`;
