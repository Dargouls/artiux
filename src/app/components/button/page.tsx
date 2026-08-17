'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Button } from '@/artiux-components/button';

export default function ButtonComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Button</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um botão com efeito ripple, estado de loading e ornamentos</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority motion lucide-react' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<Button variant='primary' color='primary' ornament='settings'>
						Primary
					</Button>
					<Button variant='secondary' color='info'>
						Secondary
					</Button>
					<Button variant='ghost' color='destructive'>
						Ghost
					</Button>
					<Button variant='primary' size='sm'>
						Small
					</Button>
					<Button variant='primary' loading>
						Loading
					</Button>
					<Button variant='primary' disabled>
						Disabled
					</Button>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { Button } from '@/artiux-components/button';

<Button variant='primary' color='primary' ornament='settings'>
	Primary
</Button>
<Button variant='secondary' color='info'>
	Secondary
</Button>
<Button variant='ghost' color='destructive'>
	Ghost
</Button>
<Button variant='primary' size='sm'>
	Small
</Button>
<Button variant='primary' loading>
	Loading
</Button>
`;

const componentCode = `
'use client';

import { textVariants } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { CircularProgress } from '@/components/ui/circularProgress';
import { Icon, IconName } from '@/components/ui/icons';
import { RippleContainer } from '@/components/ui/rippleContainer';
import { Color, getColors } from '@/utils/getColors';
import { motion } from 'motion/react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost';
	color?: Color;
	loading?: boolean;
	size?: 'sm' | 'lg';
	ornament?: IconName;
	ornamentPosition?: 'left' | 'right';
	typography?: VariantProps<typeof textVariants>['typography'];
	forceTextCentered?: boolean;
}

export function Button({
	children,
	variant = 'primary',
	color = 'primary',
	size,
	ornament,
	ornamentPosition = 'left',
	typography = 'action',
	forceTextCentered,
	loading,
	...props
}: ButtonProps) {
	const buttonVariants = cva(
		\`relative flex w-full text-nowrap overflow-hidden scrollbar-none font-semibold items-center box-border justify-center gap-2 rounded-xl duration-300 tracking-wider outline-none transition-all hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-100 data-[loading=true]:opacity-80 data-[loading=true]:pointer-events-none\`,
		{
			variants: {
				variant: {
					primary: \`bg-\${getColors(color).background} text-\${getColors(color).foreground} shadow-xl shadow-\${getColors(color).background}/15\`,
					secondary: \`bg-\${getColors(color).background}/15 text-\${getColors(color).background}\`,
					ghost: \`text-\${getColors(color).background} rounded-none\`,
				},
				size: {
					lg: 'px-4 py-3 text-base',
					sm: 'px-3 py-1.5 text-sm w-max',
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
					type={props.type || 'button'}
					{...props}
					className={cn('group', textVariants({ typography }), buttonVariants({ variant, size }), props.className)}
				>
					<motion.div
						className='flex items-center justify-center gap-2'
						initial={{ translateY: 0 }}
						animate={{ translateY: loading ? '-150%' : 0, opacity: loading ? 0 : 1 }}
						transition={{ duration: 0.3, ease: 'easeInOut', type: 'spring' }}
					>
						{variant === 'ghost' || forceTextCentered ? (
							<>
								{ornament && (
									<Icon
										icon={ornament}
										className={cn('opacity-0', size === 'sm' ? 'size-5' : 'size-6', ornamentPosition === 'left' && 'opacity-100')}
									/>
								)}

								{children}

								{ornament && (
									<Icon
										icon={ornament}
										className={cn('opacity-0', size === 'sm' ? 'size-5' : 'size-6', ornamentPosition === 'right' && 'opacity-100')}
									/>
								)}
							</>
						) : (
							<>
								{ornament && ornamentPosition === 'left' && <Icon icon={ornament} className={size === 'sm' ? 'size-4' : 'size-5'} />}

								{children}

								{ornament && ornamentPosition === 'right' && <Icon icon={ornament} className={size === 'sm' ? 'size-4' : 'size-5'} />}
							</>
						)}
					</motion.div>

					<motion.div
						className='absolute flex justify-center'
						initial={{ translateY: '150%', opacity: 0 }}
						animate={{ translateY: loading ? 0 : '150%', opacity: loading ? 1 : 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut', type: 'spring', stiffness: 150, damping: 12 }}
					>
						<CircularProgress
							className={cn('group-data-[variant="primary"]:fill-primary-foreground', size === 'sm' ? 'size-5' : 'size-6')}
						/>
					</motion.div>
				</button>
			</RippleContainer>
		</>
	);
}
`;
