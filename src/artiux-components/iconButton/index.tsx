'use client';

import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { Color, getColors } from '@/artiux-utils/getColors';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CircularProgress } from '../circularProgress';
import { Icon, IconName } from '../icons';
import { RippleContainer } from '../rippleContainer';

export interface IconButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	iconClassname?: string;
	variant?: 'primary' | 'secondary' | 'ghost';
	color?: Color;
	loading?: boolean;
	size?: 'sm' | 'lg';
	icon?: IconName;
}

export function IconButton({
	children,
	variant = 'primary',
	color = 'primary',
	size,
	icon,
	loading,
	iconClassname,
	...props
}: IconButtonProps) {
	const variants = cva(
		`relative flex aspect-square active:scale-[0.99] text-nowrap w-max h-max font-semibold items-center box-border justify-center gap-2 rounded-xl duration-300 tracking-wider outline-none transition-all hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-100 data-[loading=true]:opacity-60 data-[loading=true]:pointer-events-none`,
		{
			variants: {
				variant: {
					primary: `bg-${getColors(color).background} text-${getColors(color).foreground} shadow-xl shadow-${getColors(color).background}/15`,
					secondary: `bg-${getColors(color).background}/15 text-${getColors(color).background}`,
					ghost: `text-${getColors(color).background} rounded-none`,
				},
				size: {
					lg: 'px-4 py-4 text-base',
					sm: 'px-3 py-3 text-sm w-max',
				},
			},
			defaultVariants: {
				variant: 'primary',
				size: 'lg',
			},
		}
	);

	return (
		<>
			<RippleContainer>
				<button
					data-variant={variant}
					data-loading={loading}
					disabled={loading || props.disabled}
					{...props}
					className={cn('group', variants({ variant, size }), props.className)}
				>
					<motion.div
						className={cn('flex items-center justify-center gap-2')}
						initial={{ translateY: 0 }}
						animate={{ translateY: loading ? '-150%' : 0, opacity: loading ? 0 : 1 }}
						transition={{ duration: 0.3, ease: 'easeInOut', type: 'spring' }}
					>
						{icon && <Icon icon={icon} className={cn(size === 'sm' ? 'size-5' : 'size-6', iconClassname)} />}
					</motion.div>

					<motion.div
						className='absolute flex justify-center'
						initial={{ translateY: '150%', opacity: 0 }}
						animate={{ translateY: loading ? 0 : '150%', opacity: loading ? 1 : 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut', type: 'spring', stiffness: 150, damping: 12 }}
					>
						<CircularProgress
							className={cn('group-data-[variant="primary"]:fill-primary-foreground', size === 'sm' ? 'size-4' : 'size-5')}
						/>
					</motion.div>
				</button>
			</RippleContainer>
		</>
	);
}
