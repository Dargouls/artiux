import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
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
					'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive group flex w-full flex-col justify-center gap-2 rounded-3xl border-2 p-4 outline-none transition-[color,box-shadow,border-color] duration-200 ease-in-out focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
					'data-[state=checked]:border-primary',
					props.className
				)}
				{...props}
			>
				<div className='flex items-center gap-2'>
					<div
						className={cn(
							'border-input flex aspect-square size-6 w-max items-center justify-center rounded-full border transition-[border-color] duration-200 ease-in-out',
							'group-data-[state=checked]:border-primary'
						)}
					>
						<RadioGroupPrimitive.Indicator data-slot='radio-group-indicator' className='relative flex items-center justify-center'>
							<motion.span
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.2, ease: 'easeInOut', type: 'spring', stiffness: 300, damping: 20 }}
								className='bg-primary absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full'
							/>
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
