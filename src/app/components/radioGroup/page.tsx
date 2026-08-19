'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { RadioGroup, RadioGroupItem } from '@/artiux-components/radioGroup';

const orientations = ['horizontal', 'vertical'] as const;

export default function RadioGroupComponent() {
	const [orientation, setOrientation] = useState<(typeof orientations)[number]>('horizontal');
	const [disabled, setDisabled] = useState(false);

	const props = [
		orientation === 'vertical' ? `orientation='vertical'` : null,
		disabled ? 'disabled' : null,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { RadioGroup, RadioGroupItem } from '@/artiux-components/radioGroup';

<RadioGroup defaultValue='1' ${props}>
	<RadioGroupItem value='1' />
	<RadioGroupItem value='2' />
</RadioGroup>
`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Radio Group</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um grupo de opções de rádio simples e acessível</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add radix-ui lucide-react' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<RadioGroup
						defaultValue='1'
						orientation={orientation}
						disabled={disabled}
						className={`flex gap-4 ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}
					>
						<RadioGroupItem value='1' />
						<RadioGroupItem value='2' />
						<RadioGroupItem value='3' />
					</RadioGroup>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlDropdown label='Orientation' value={orientation} options={orientations} onChange={setOrientation} />
					<ControlSwitch label='Disabled' checked={disabled} onChange={setDisabled} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{ property: 'defaultValue', type: 'string', description: 'Valor inicial selecionado (não controlado). (RadioGroup)' },
	{ property: 'value', type: 'string', description: 'Valor selecionado, para uso controlado. (RadioGroup)' },
	{ property: 'onValueChange', type: '(value: string) => void', description: 'Chamado quando o valor selecionado muda. (RadioGroup)' },
	{
		property: 'orientation',
		type: "'horizontal' | 'vertical'",
		description: 'Orientação do grupo para navegação por teclado. (RadioGroup)',
	},
	{ property: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita todos os itens do grupo. (RadioGroup)' },
	{ property: 'name', type: 'string', description: 'Nome do grupo em um formulário nativo. (RadioGroup)' },
	{ property: 'required', type: 'boolean', default: 'false', description: 'Indica se a seleção é obrigatória. (RadioGroup)' },
	{ property: 'value (item)', type: 'string', description: 'Valor do item de rádio. (RadioGroupItem)' },
	{ property: 'disabled (item)', type: 'boolean', default: 'false', description: 'Desabilita este item específico. (RadioGroupItem)' },
];

const componentCode = `
import { cn } from '@/lib/utils';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';

import { CircleIcon } from 'lucide-react';

export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
function RadioGroup({ className, ...props }: RadioGroupProps) {
	return <RadioGroupPrimitive.Root data-slot='radio-group' className={cn('grid gap-3', className)} {...props} />;
}

export type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>;
function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
	return (
		<RadioGroupPrimitive.Item
			data-slot='radio-group-item'
			className={cn(
				'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-6 shrink-0 rounded-full border outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:border-primary',
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator data-slot='radio-group-indicator' className='relative flex items-center justify-center'>
				<CircleIcon className='fill-primary absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2' />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
`;
