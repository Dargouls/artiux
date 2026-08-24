'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Aside } from '@/artiux/components/aside';
import { Badge } from '@/artiux/components/badge';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

const colors = ['primary', 'warning', 'destructive', 'success', 'info'] as const;
const sizes = ['lg', 'sm'] as const;
const ornaments = ['none', 'settings', 'heart'] as const;
const ornamentPositions = ['left', 'right'] as const;

export default function BadgeComponent() {
	const [color, setColor] = useState<(typeof colors)[number]>('primary');
	const [size, setSize] = useState<(typeof sizes)[number]>('lg');
	const [ornament, setOrnament] = useState<(typeof ornaments)[number]>('none');
	const [ornamentPosition, setOrnamentPosition] = useState<(typeof ornamentPositions)[number]>('left');
	const [active, setActive] = useState(true);

	const props = [
		`color='${color}'`,
		size === 'sm' ? `size='sm'` : null,
		ornament !== 'none' ? `ornament='${ornament}'` : null,
		ornament !== 'none' && ornamentPosition === 'right' ? `ornamentPosition='right'` : null,
		active ? null : 'active={false}',
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { Badge } from '@/artiux/components/badge';

<Badge ${props}>
	Badge
</Badge>
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Badge</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>Uma etiqueta compacta para status, categorias e contadores</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<Badge
							color={color}
							size={size === 'lg' ? undefined : size}
							ornament={ornament === 'none' ? undefined : ornament}
							ornamentPosition={ornamentPosition}
							active={active}
						>
							Badge
						</Badge>
						<Badge color='info' ornament='settings'>
							Com ícone
						</Badge>
						<Badge color='destructive' active={false}>
							Inativo
						</Badge>
						<Badge color='success' size='sm'>
							Pequeno
						</Badge>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlDropdown label='Color' value={color} options={colors} onChange={setColor} />
						<ControlDropdown label='Size' value={size} options={sizes} onChange={setSize} />
						<ControlDropdown label='Ornament' value={ornament} options={ornaments} onChange={setOrnament} />
						<ControlDropdown
							label='Ornament position'
							value={ornamentPosition}
							options={ornamentPositions}
							onChange={setOrnamentPosition}
						/>
						<ControlSwitch label='Active' checked={active} onChange={setActive} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add class-variance-authority' code={componentCode} fileName='artiux/components/badge/index.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{
		property: 'color',
		type: "'primary' | 'warning' | 'destructive' | 'success' | 'info'",
		default: "'primary'",
		description: 'Cor semântica aplicada à badge.',
	},
	{ property: 'size', type: "'sm' | 'lg'", default: "'lg'", description: 'Tamanho da badge.' },
	{ property: 'active', type: 'boolean', default: 'true', description: 'Quando falso, exibe a badge em estado inativo (contorno).' },
	{ property: 'ornament', type: 'IconName', description: 'Ícone exibido junto ao texto.' },
	{ property: 'ornamentPosition', type: "'left' | 'right'", default: "'left'", description: 'Posição do ícone em relação ao texto.' },
	{
		property: 'typography',
		type: "VariantProps<typeof textVariants>['typography']",
		default: "'caption'",
		description: 'Variante tipográfica do texto.',
	},
];

const componentCode = `
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Icon, IconName } from '@/artiux/components/icons';
import { textVariants } from '@/artiux/components/text';
import { Color, getColors } from '@/artiux/utils/getColors';
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
				active ? \`bg-\${colors.background}/15 text-\${colors.background}\` : \`bg-card text-\${colors.background}\`,
				className
			)}
		>
			{ornament && ornamentPosition === 'left' && <Icon icon={ornament} className={cn(size === 'sm' ? 'size-4' : 'size-5')} />}

			{children}

			{ornament && ornamentPosition === 'right' && <Icon icon={ornament} className={cn(size === 'sm' ? 'size-4' : 'size-5')} />}
		</div>
	);
}
`;
