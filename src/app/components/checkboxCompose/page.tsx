'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { CheckboxComposeItem } from '@/artiux-components/checkboxCompose';

export default function CheckboxComposeComponent() {
	const [checked, setChecked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [withImage, setWithImage] = useState(true);
	const [withAction, setWithAction] = useState(true);

	const props = [
		'title=\'Item 1\'',
		'description=\'Descrição\'',
		withAction ? "actionName='Visualizar'\n\taction={() => console.log(1)}" : null,
		withImage ? "image='/image.png'" : null,
		checked ? 'checked' : null,
		disabled ? 'disabled' : null,
	]
		.filter(Boolean)
		.join('\n\t');

	const previewCode = `
import { CheckboxComposeItem } from '@/artiux-components/checkboxCompose';

<CheckboxComposeItem
	${props}
/>
`;

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
							actionName={withAction ? 'Visualizar' : undefined}
							action={() => console.log(1)}
							image={withImage ? '/image.png' : undefined}
							checked={checked}
							onCheckedChange={(value) => setChecked(value === true)}
							disabled={disabled}
						/>
						<CheckboxComposeItem title='Item 2' description='Sem imagem e sem ação' />
						<CheckboxComposeItem title='Item 3' description='Desabilitado' disabled />
					</div>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlSwitch label='Checked' checked={checked} onChange={setChecked} />
					<ControlSwitch label='Disabled' checked={disabled} onChange={setDisabled} />
					<ControlSwitch label='Com imagem' checked={withImage} onChange={setWithImage} />
					<ControlSwitch label='Com ação' checked={withAction} onChange={setWithAction} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{ property: 'title', type: 'string', description: 'Título exibido no item.' },
	{ property: 'description', type: 'string', description: 'Texto descritivo exibido abaixo do título.' },
	{ property: 'actionName', type: 'string', description: 'Rótulo do botão de ação, exibido quando informado.' },
	{ property: 'action', type: '() => void', description: 'Função executada ao clicar no botão de ação.' },
	{ property: 'image', type: 'string | StaticImageData', description: 'Imagem exibida ao lado do título/descrição.' },
	{ property: 'customNode', type: 'React.ReactNode', description: 'Conteúdo customizado exibido abaixo do item.' },
	{ property: 'checked', type: 'boolean', description: 'Controla o estado marcado do checkbox.' },
	{ property: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback disparado quando o estado marcado muda.' },
	{ property: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a interação com o item.' },
];

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
