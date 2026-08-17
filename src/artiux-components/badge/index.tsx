import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Icon, IconName } from '@/artiux-components/icons';
import { textVariants } from '@/artiux-components/text';
import { Color, getColors } from '@/artiux-utils/getColors';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
	ornament?: IconName;
	ornamentPosition?: 'left' | 'right';
	typography?: VariantProps<typeof textVariants>['typography'];
	size?: 'sm' | 'lg';
	color?: Color;
}

const badgeVariants = cva(
	'inline-flex gap-2 items-center rounded-xl w-max shadow-xs cursor-default transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			active: {
				true: '',
				false: '',
			},
			size: {
				lg: 'px-4 py-2',
				sm: 'px-3 py-1.5 text-sm',
			},
		},
		defaultVariants: {
			active: true,
			size: 'lg',
		},
	}
);

export function Badge({
	className,
	active = true,
	ornament,
	ornamentPosition = 'left',
	typography = 'caption',
	size,
	color = 'primary',
	children,
	...props
}: BadgeProps) {
	const colors = getColors(color);

	return (
		<div
			{...props}
			className={cn(
				textVariants({ typography }),
				badgeVariants({ active, size }),
				active ? `bg-${colors.background}/15 text-${colors.background}` : `bg-card text-${colors.background}`,
				className
			)}
		>
			{ornament && ornamentPosition === 'left' && <Icon icon={ornament} className={cn(size === 'sm' ? 'size-4' : 'size-5')} />}

			{children}

			{ornament && ornamentPosition === 'right' && <Icon icon={ornament} className={cn(size === 'sm' ? 'size-4' : 'size-5')} />}
		</div>
	);
}
