'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Button } from '@/artiux-components/button';
import { ButtonGroup } from '@/artiux-components/buttonGroup';

export default function ButtonGroupComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Button Group</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Agrupa botões lado a lado, com separadores opcionais</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority radix-ui' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<ButtonGroup orientation='horizontal' showSeparator>
						<Button variant='secondary'>Botão 1</Button>
						<Button variant='secondary'>Botão 2</Button>
						<Button variant='secondary'>Botão 3</Button>
					</ButtonGroup>

					<ButtonGroup orientation='vertical' showSeparator={false} className='w-max'>
						<Button variant='primary'>Topo</Button>
						<Button variant='primary'>Meio</Button>
						<Button variant='primary'>Baixo</Button>
					</ButtonGroup>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { Button } from '@/artiux-components/button';
import { ButtonGroup } from '@/artiux-components/buttonGroup';

<ButtonGroup orientation='horizontal' showSeparator>
	<Button variant='secondary'>Botão 1</Button>
	<Button variant='secondary'>Botão 2</Button>
	<Button variant='secondary'>Botão 3</Button>
</ButtonGroup>
`;

const componentCode = `
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Children, Fragment } from 'react';

const buttonGroupVariants = cva(
	"has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg flex items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					'[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
				vertical:
					'[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	}
);

export interface ButtonGroupProps extends React.ComponentProps<'div'>, VariantProps<typeof buttonGroupVariants> {
	showSeparator?: boolean;
}

function ButtonGroup({ className, orientation = 'horizontal', showSeparator = true, children, ...props }: ButtonGroupProps) {
	// Transforma os filhos em um array para manipular
	const childrenArray = Children.toArray(children);

	return (
		<div
			role='group'
			data-slot='button-group'
			data-orientation={orientation}
			className={cn(buttonGroupVariants({ orientation }), className)}
			{...props}
		>
			{childrenArray.map((child, index) => {
				const isLast = index === childrenArray.length - 1;

				return (
					<Fragment key={index}>
						{child}
						{/* Insere o separador se não for o último item e showSeparator for true */}
						{!isLast && showSeparator && <ButtonGroupSeparator orientation={orientation === 'vertical' ? 'horizontal' : 'vertical'} />}
					</Fragment>
				);
			})}
		</div>
	);
}

function ButtonGroupText({
	className,
	asChild = false,
	...props
}: React.ComponentProps<'div'> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot.Root : 'div';

	return (
		<Comp
			className={cn(
				"bg-muted flex items-center gap-2 rounded-lg border px-2.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className
			)}
			{...props}
		/>
	);
}

function ButtonGroupSeparator({ className, orientation = 'vertical', ...props }: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot='button-group-separator'
			orientation={orientation}
			className={cn('bg-border shrink-0', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-auto w-[1px]', className)}
			{...props}
		/>
	);
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
`;
