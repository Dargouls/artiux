'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Switch } from '@/artiux-components/switch';

export default function SwitchComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Switch</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um alternador para ligar/desligar uma opção</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add radix-ui' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
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
		</>
	);
}

const previewCode = `
import { Switch } from '@/artiux-components/switch';

<Switch defaultChecked />
`;

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
