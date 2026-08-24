'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Aside } from '@/artiux/components/aside';
import { Switch } from '@/artiux/components/switch';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

export default function SwitchComponent() {
	const [checked, setChecked] = useState(true);
	const [disabled, setDisabled] = useState(false);

	const props = [checked ? 'checked' : null, disabled ? 'disabled' : null].filter(Boolean).join(' ');

	const previewCode = `
import { Switch } from '@/artiux/components/switch';

<Switch ${props} />
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Switch</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>Um alternador para ligar/desligar uma opção</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<div className='flex items-center gap-3'>
							<Switch checked={checked} onCheckedChange={setChecked} disabled={disabled} />
							<span className='text-sm'>{checked ? 'Ativado' : 'Desativado'}</span>
						</div>
						<div className='flex items-center gap-3'>
							<Switch defaultChecked />
							<span className='text-sm'>Ativado</span>
						</div>
						<div className='flex items-center gap-3'>
							<Switch />
							<span className='text-sm'>Desativado</span>
						</div>
						<div className='flex items-center gap-3'>
							<Switch disabled defaultChecked />
							<span className='text-sm'>Desabilitado</span>
						</div>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlSwitch label='Checked' checked={checked} onChange={setChecked} />
						<ControlSwitch label='Disabled' checked={disabled} onChange={setDisabled} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add radix-ui' code={componentCode} fileName='artiux/components/switch/index.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{ property: 'checked', type: 'boolean', description: 'Controla o estado ligado/desligado de forma controlada.' },
	{ property: 'defaultChecked', type: 'boolean', default: 'false', description: 'Estado inicial quando não controlado.' },
	{ property: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Chamado quando o estado é alterado.' },
	{ property: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita a interação com o switch.' },
];

const componentCode = `
'use client';

import { Switch as SwitchPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			className={cn(
				'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 shadow-xs peer inline-flex w-14 shrink-0 items-center rounded-xl border border-transparent py-0.5 outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-6 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+4px)] data-[state=unchecked]:translate-x-[calc(0%+2px)]'
				)}
			/>
		</SwitchPrimitive.Root>
	);
}
`;
