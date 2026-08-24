'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Aside } from '@/artiux/components/aside';
import { RadioComposeItem } from '@/artiux/components/radioCompose';
import { RadioGroup } from '@/artiux/components/radioGroup';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

export default function RadioComposeComponent() {
	const [withDescription, setWithDescription] = useState(true);
	const [withAction, setWithAction] = useState(true);

	const props = [
		withDescription ? `description='Descrição'` : null,
		withAction ? `actionName='Visualizar' action={() => console.log(1)}` : null,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { RadioComposeItem } from '@/artiux/components/radioCompose';
import { RadioGroup } from '@/artiux/components/radioGroup';

<RadioGroup defaultValue='1'>
	<RadioComposeItem title='Item 1' value='1' ${props} />
	<RadioComposeItem title='Item 2' value='2' ${props} />
</RadioGroup>
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Radio Compose</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>
						Um card de opção de rádio com título, descrição e ação opcionais, para usar dentro de um RadioGroup
					</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<RadioGroup defaultValue='1' className='flex w-full max-w-md flex-col gap-4'>
							<RadioComposeItem
								title='Item 1'
								value='1'
								description={withDescription ? 'Descrição' : undefined}
								actionName={withAction ? 'Visualizar' : undefined}
								action={withAction ? () => console.log(1) : undefined}
							/>
							<RadioComposeItem
								title='Item 2'
								value='2'
								description={withDescription ? 'Descrição' : undefined}
								actionName={withAction ? 'Visualizar' : undefined}
								action={withAction ? () => console.log(2) : undefined}
							/>
							<RadioComposeItem title='Item 3' description='Sem ação' value='3' />
						</RadioGroup>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlSwitch label='Com descrição' checked={withDescription} onChange={setWithDescription} />
						<ControlSwitch label='Com ação' checked={withAction} onChange={setWithAction} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add radix-ui' code={componentCode} fileName='artiux/components/radioCompose/index.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{ property: 'title', type: 'string', description: 'Título exibido no item.' },
	{ property: 'description', type: 'string', description: 'Descrição exibida abaixo do título.' },
	{ property: 'actionName', type: 'string', description: 'Texto do botão de ação exibido no item.' },
	{ property: 'action', type: '() => void', description: 'Função chamada ao clicar no botão de ação, sem selecionar o item.' },
	{ property: 'value', type: 'string', description: 'Valor do item dentro do RadioGroup.' },
];

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
