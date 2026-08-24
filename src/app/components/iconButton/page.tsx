'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Aside } from '@/artiux/components/aside';
import { IconButton } from '@/artiux/components/iconButton';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

const variants = ['primary', 'secondary', 'ghost'] as const;
const colors = ['primary', 'warning', 'destructive', 'success', 'info'] as const;
const sizes = ['lg', 'sm'] as const;

export default function IconButtonComponent() {
	const [variant, setVariant] = useState<(typeof variants)[number]>('primary');
	const [color, setColor] = useState<(typeof colors)[number]>('primary');
	const [size, setSize] = useState<(typeof sizes)[number]>('lg');
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const props = [
		`variant='${variant}'`,
		`color='${color}'`,
		size === 'sm' ? `size='sm'` : null,
		loading ? 'loading' : null,
		disabled ? 'disabled' : null,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { IconButton } from '@/artiux/components/iconButton';

<IconButton ${props} icon='settings' />
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Icon Button</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>Um botão quadrado só com ícone, com efeito ripple e loading</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<IconButton
							variant={variant}
							color={color}
							size={size === 'lg' ? undefined : size}
							icon='settings'
							loading={loading}
							disabled={disabled}
						/>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlDropdown label='Variant' value={variant} options={variants} onChange={setVariant} />
						<ControlDropdown label='Color' value={color} options={colors} onChange={setColor} />
						<ControlDropdown label='Size' value={size} options={sizes} onChange={setSize} />
						<ControlSwitch label='Loading' checked={loading} onChange={setLoading} />
						<ControlSwitch label='Disabled' checked={disabled} onChange={setDisabled} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode
							installs='yarn add class-variance-authority motion lucide-react'
							code={componentCode}
							fileName='artiux/components/iconButton/index.tsx'
						/>
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{ property: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Estilo visual do botão.' },
	{
		property: 'color',
		type: "'primary' | 'warning' | 'destructive' | 'success' | 'info'",
		default: "'primary'",
		description: 'Cor semântica aplicada ao botão.',
	},
	{ property: 'size', type: "'sm' | 'lg'", default: "'lg'", description: 'Tamanho do botão.' },
	{ property: 'icon', type: 'IconName', description: 'Ícone exibido dentro do botão.' },
	{ property: 'iconClassname', type: 'string', description: 'Classes aplicadas diretamente ao ícone.' },
	{ property: 'loading', type: 'boolean', default: 'false', description: 'Exibe indicador de carregamento e desabilita o botão.' },
	{ property: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão.' },
];

const componentCode = `
'use client';

import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { CircularProgress } from '@/components/ui/circularProgress';
import { Icon, IconName } from '@/components/ui/icons';
import { RippleContainer } from '@/components/ui/rippleContainer';
import { cn } from '@/lib/utils';
import { Color, getColors } from '@/utils/getColors';
import { motion } from 'motion/react';

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
		\`relative flex aspect-square text-nowrap w-max h-max font-semibold items-center box-border justify-center gap-2 rounded-xl duration-300 tracking-wider outline-none transition-all hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-100 data-[loading=true]:opacity-60 data-[loading=true]:pointer-events-none\`,
		{
			variants: {
				variant: {
					primary: \`bg-\${getColors(color).background} text-\${getColors(color).foreground} shadow-xl shadow-\${getColors(color).background}/15\`,
					secondary: \`bg-\${getColors(color).background}/15 text-\${getColors(color).background}\`,
					ghost: \`text-\${getColors(color).background} rounded-none\`,
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
`;
