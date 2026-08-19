'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
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
				'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-6 shrink-0 rounded-full border outline-none transition-[color,box-shadow,border-color] duration-200 ease-in-out focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:border-primary',
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator data-slot='radio-group-indicator' className='relative flex items-center justify-center'>
				<motion.span
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.2, ease: 'easeInOut', type: 'spring', stiffness: 300, damping: 20 }}
					className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
				>
					<CircleIcon className='fill-primary size-4' />
				</motion.span>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
}

export { RadioGroup, RadioGroupItem };
