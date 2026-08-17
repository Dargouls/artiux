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
	formatter, // Extraímos o formatter aqui
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

				// Aplicamos o formatter se existir, caso contrário, mostramos o número puro
				const displayedValue = formatter ? formatter(currentValue) : currentValue;

				return (
					<div className={cn(inputNumberVariants({ size }), props.disabled && 'cursor-not-allowed opacity-50', props.className)}>
						<button
							type='button'
							onClick={handleDecrement}
							disabled={isMinDisabled}
							className={cn(
								'text-primary flex items-center justify-center transition-colors duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30'
							)}
							aria-label='Diminuir valor'
						>
							<Minus className={size === 'lg' ? 'size-5' : 'size-4'} />
						</button>

						{/* O valor formatado entra aqui */}
						<span className={cn(valueVariants({ size }))}>{displayedValue}</span>

						<button
							type='button'
							onClick={handleIncrement}
							disabled={isMaxDisabled}
							className={cn(
								'text-primary flex items-center justify-center transition-colors duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30'
							)}
							aria-label='Aumentar valor'
						>
							<Plus className={size === 'lg' ? 'size-5' : 'size-4'} />
						</button>
					</div>
				);
			}}
		/>
	);
}
