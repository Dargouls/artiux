'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { InputNumber } from '@/artiux-components/inputNumber';
import { useForm } from 'react-hook-form';

export default function InputNumberComponent() {
	const { control } = useForm({
		defaultValues: {
			quantidade: 0,
			preco: 10,
			desabilitado: 5,
		},
	});

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Input Number</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um input numérico com controles de incremento e decremento</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add react-hook-form lucide-react class-variance-authority' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex flex-wrap items-center gap-6'>
						<InputNumber name='quantidade' control={control} min={0} max={15} step={1} />
						<InputNumber name='preco' control={control} min={0} max={1000} step={5} formatter={(v) => `R$ ${v}`} />
						<InputNumber name='desabilitado' control={control} min={0} max={10} disabled />
						<InputNumber name='quantidade' control={control} min={0} max={15} step={1} size='sm' />
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { InputNumber } from '@/artiux-components/inputNumber';
import { useForm } from 'react-hook-form';

const { control } = useForm({ defaultValues: { quantidade: 0, preco: 10 } });

<InputNumber name='quantidade' control={control} min={0} max={15} step={1} />
<InputNumber name='preco' control={control} min={0} max={1000} step={5} formatter={(v) => \`R$ \${v}\`} />
<InputNumber name='desabilitado' control={control} min={0} max={10} disabled />
<InputNumber name='quantidade' control={control} min={0} max={15} step={1} size='sm' />
`;

const componentCode = `
'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Minus, Plus } from 'lucide-react';
import { HTMLAttributes } from 'react';

export interface InputNumberProps<TFieldValues extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	min?: number;
	max?: number;
	step?: number;
	size?: 'sm' | 'lg';
	disabled?: boolean;
	formatter?: (value: number) => string;
}

const inputNumberVariants = cva('flex w-max items-center justify-between bg-input rounded-xl transition-all duration-150 ease-out', {
	variants: {
		size: {
			lg: 'px-4 py-3 gap-4',
			sm: 'px-3 py-1.5 gap-3',
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});

const valueVariants = cva('font-medium text-foreground tabular-nums select-none', {
	variants: {
		size: {
			lg: 'text-base min-w-[40px] text-center',
			sm: 'text-sm min-w-[32px] text-center',
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});

export function InputNumber<TFieldValues extends FieldValues>({
	name,
	control,
	min = 0,
	max = 100,
	step = 1,
	size = 'lg',
	formatter,
	...props
}: InputNumberProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => {
				const currentValue = typeof value === 'number' ? value : min;

				const handleDecrement = () => {
					const newValue = Math.max(min, currentValue - step);
					onChange(newValue);
				};

				const handleIncrement = () => {
					const newValue = Math.min(max, currentValue + step);
					onChange(newValue);
				};

				const isMinDisabled = props.disabled || currentValue <= min;
				const isMaxDisabled = props.disabled || currentValue >= max;

				const displayedValue = formatter ? formatter(currentValue) : currentValue;

				return (
					<div className={cn(inputNumberVariants({ size }), props.disabled && 'cursor-not-allowed opacity-50', props.className)}>
						<button type='button' onClick={handleDecrement} disabled={isMinDisabled} aria-label='Diminuir valor'>
							<Minus className={size === 'lg' ? 'size-5' : 'size-4'} />
						</button>

						<span className={cn(valueVariants({ size }))}>{displayedValue}</span>

						<button type='button' onClick={handleIncrement} disabled={isMaxDisabled} aria-label='Aumentar valor'>
							<Plus className={size === 'lg' ? 'size-5' : 'size-4'} />
						</button>
					</div>
				);
			}}
		/>
	);
}
`;
