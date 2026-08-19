'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'motion/react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Minus, Plus } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef } from 'react';

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
			lg: 'text-base min-w-[40px] justify-center',
			sm: 'text-sm min-w-[32px] justify-center',
		},
	},
	defaultVariants: {
		size: 'lg',
	},
});

function AnimatedDigits({ value, size, direction }: { value: string; size: 'sm' | 'lg'; direction: 1 | -1 }) {
	const enterFrom = direction >= 0 ? '100%' : '-100%';
	const exitTo = direction >= 0 ? '-100%' : '100%';

	const chars = value.split('');
	const prevRef = useRef<{ chars: string[]; versions: number[] }>({ chars, versions: chars.map(() => 0) });
	const prev = prevRef.current;

	const versions = chars.map((char, index) => (prev.chars[index] === char ? (prev.versions[index] ?? 0) : (prev.versions[index] ?? 0) + 1));

	useEffect(() => {
		prevRef.current = { chars, versions };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return (
		<span className={cn(valueVariants({ size }), 'inline-flex items-center')}>
			{chars.map((char, index) => (
				<span key={index} className='relative inline-block h-[1.2em] w-[1ch] overflow-hidden text-center leading-[1.2em]'>
					<AnimatePresence initial={false}>
						<motion.span
							key={`${index}-${versions[index]}`}
							initial={{ y: enterFrom, opacity: 0 }}
							animate={{ y: '0%', opacity: 1 }}
							exit={{ y: exitTo, opacity: 0 }}
							transition={{
								type: 'spring',
								stiffness: 500,
								damping: 30,
								mass: 0.8,
							}}
							className='absolute inset-x-0'
						>
							{char === ' ' ? ' ' : char}
						</motion.span>
					</AnimatePresence>
				</span>
			))}
		</span>
	);
}

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
	const prevValueRef = useRef<number>(min);
	const directionRef = useRef<1 | -1>(1);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => {
				const currentValue = typeof value === 'number' ? value : min;

				if (currentValue !== prevValueRef.current) {
					directionRef.current = currentValue > prevValueRef.current ? 1 : -1;
					prevValueRef.current = currentValue;
				}

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

						{/* O valor formatado entra aqui, animado dígito a dígito */}
						<AnimatedDigits value={String(displayedValue)} size={size} direction={directionRef.current} />

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
