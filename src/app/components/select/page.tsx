'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlDropdown, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Select } from '@/artiux-components/select';
import { useForm } from 'react-hook-form';

const sizes = ['lg', 'sm'] as const;
const ornaments = ['none', 'globe', 'search', 'settings'] as const;

export default function SelectComponent() {
	const { control: statusControl } = useForm({
		defaultValues: {
			status: '',
		},
	});

	const { control: cityControl } = useForm({
		defaultValues: {
			city: '',
		},
	});

	const [size, setSize] = useState<(typeof sizes)[number]>('lg');
	const [ornament, setOrnament] = useState<(typeof ornaments)[number]>('none');
	const [showDescription, setShowDescription] = useState(true);

	const statusOptions = [
		{ label: 'Ativo', value: 'ativo' },
		{ label: 'Inativo', value: 'inativo' },
		{ label: 'Pendente', value: 'pendente' },
		{ label: 'Cancelado', value: 'cancelado' },
		{ label: 'Expirado', value: 'expirado' },
	];

	const cityOptions = [
		{ label: 'São Paulo', value: 'sp' },
		{ label: 'Rio de Janeiro', value: 'rj' },
		{ label: 'Belo Horizonte', value: 'bh' },
	];

	const props = [
		`name='status'`,
		`options={options}`,
		size === 'sm' ? `size='sm'` : null,
		`title='Status'`,
		showDescription ? `description='Selecione o status'` : null,
		ornament !== 'none' ? `ornament='${ornament}'` : null,
	]
		.filter(Boolean)
		.join('\n\t');

	const previewCode = `
import { Select } from '@/artiux-components/select';
import { useForm } from 'react-hook-form';

const { control } = useForm({ defaultValues: { status: '' } });

const options = [
	{ label: 'Ativo', value: 'ativo' },
	{ label: 'Inativo', value: 'inativo' },
];

<Select
	${props}
	control={control}
	content={() => <p>O status define a situação do registro</p>}
	footerClassname='flex flex-wrap flex-row'
/>
`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Select</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					Um seletor de opções responsivo: drawer no mobile e dropdown (Radix Select) no desktop, com suporte a ícone e descrição
				</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority motion react-hook-form' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex w-full max-w-xs flex-col gap-6'>
						<div>
							<span className='text-muted-foreground mb-1 block text-sm'>Padrão</span>
							<Select
								name='status'
								control={statusControl}
								options={statusOptions}
								title='Status'
								description={showDescription ? 'Selecione o status' : undefined}
								placeholder='Selecionar'
								size={size}
								ornament={ornament === 'none' ? undefined : ornament}
								content={() => <p className='text-muted-foreground text-sm'>O status define a situação do registro</p>}
							/>
						</div>

						<div>
							<span className='text-muted-foreground mb-1 block text-sm'>Com ícone (ornament)</span>
							<Select
								name='city'
								control={cityControl}
								options={cityOptions}
								title='Cidade'
								placeholder='Selecionar cidade'
								ornament='globe'
								size='sm'
							/>
						</div>
					</div>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlDropdown label='Size' value={size} options={sizes} onChange={setSize} />
					<ControlDropdown label='Ornament' value={ornament} options={ornaments} onChange={setOrnament} />
					<ControlSwitch label='Description' checked={showDescription} onChange={setShowDescription} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{ property: 'name', type: 'Path<TFieldValues>', description: 'Nome do campo controlado pelo react-hook-form.' },
	{ property: 'control', type: 'Control<TFieldValues>', description: 'Objeto de controle do formulário (react-hook-form).' },
	{ property: 'options', type: '{ label: string; value: string | number }[]', description: 'Opções exibidas no drawer.' },
	{ property: 'placeholder', type: 'string', default: "'Selecionar'", description: 'Texto exibido quando nenhum valor está selecionado.' },
	{ property: 'title', type: 'string', description: 'Título exibido no cabeçalho do drawer.' },
	{ property: 'description', type: 'string', description: 'Descrição exibida abaixo do título no drawer.' },
	{ property: 'ornament', type: 'IconName', description: 'Ícone exibido dentro do gatilho de seleção.' },
	{ property: 'size', type: "'sm' | 'lg'", default: "'lg'", description: 'Tamanho do gatilho de seleção.' },
	{
		property: 'typography',
		type: "VariantProps<typeof textVariants>['typography']",
		default: "'caption'",
		description: 'Variante tipográfica do texto do gatilho.',
	},
	{ property: 'footerClassname', type: 'string', description: 'Classes aplicadas ao rodapé do drawer com os botões de opção.' },
	{ property: 'drawerProps', type: 'DrawerProps', description: 'Props repassadas diretamente para o componente Drawer.' },
	{ property: 'buttonsProps', type: 'ButtonProps', description: 'Props repassadas para os botões de opção do drawer.' },
	{ property: 'content', type: '(ctx) => React.ReactNode', description: 'Conteúdo customizado renderizado dentro do drawer.' },
];

const componentCode = `
'use client';

import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Button, ButtonProps } from '@/artiux-components/button';
import { ButtonGroup } from '@/artiux-components/buttonGroup';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerProps, DrawerTitle } from '@/artiux-components/drawer';
import { Icon, IconName } from '@/artiux-components/icons';
import { RippleContainer } from '@/artiux-components/rippleContainer';
import { textVariants } from '@/artiux-components/text';
import { textFieldVariants } from '@/artiux-components/textField';

// 1. Adicionado Generic TFieldValues para inferir as chaves do formulário
export interface SelectProps<TFieldValues extends FieldValues> {
	footerClassname?: string;
	name: Path<TFieldValues>; // name é validado contra o schema
	options?: SelectItemProps[];
	control: Control<TFieldValues>;
	placeholder?: string;
	title?: string;
	description?: string;
	ornament?: IconName;
	size?: 'sm' | 'lg';
	typography?: VariantProps<typeof textVariants>['typography'];
	drawerProps?: DrawerProps;
	buttonsProps?: ButtonProps;
	content?: (ctx: {
		value: string;
		tempValue: string | null;
		setTempValue: (v: string) => void;
		confirm: () => void;
		close: () => void;
	}) => React.ReactNode;
}

export interface SelectItemProps {
	label: string;
	value: string | number;
}

// 2. Transformado em Generic Function
export function Select<TFieldValues extends FieldValues>({
	name,
	options,
	control,
	placeholder = 'Selecionar',
	title,
	description,
	ornament,
	size = 'lg',
	typography = 'caption',
	footerClassname,
	drawerProps,
	buttonsProps,
	content,
}: SelectProps<TFieldValues>) {
	const [open, setOpen] = React.useState(false);
	const [tempValue, setTempValue] = React.useState<string | null>(null);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const { value, onChange } = field;

				async function handleSelect(val: string | number) {
					setOpen(false);
					onChange(val);
				}

				return (
					<>
						{/* Trigger */}
						<RippleContainer>
							<button
								type='button'
								onClick={() => setOpen(true)}
								className={cn(
									textFieldVariants({ size }),
									textVariants({ typography }),
									'text-primary relative flex w-full items-center justify-between overflow-hidden'
								)}
							>
								<AnimatePresence mode='wait'>
									<motion.div
										className='flex gap-2'
										key={value || 'placeholder'}
										initial={{ translateY: '150%', opacity: 0 }}
										animate={{ translateY: 0, opacity: 1 }}
										exit={{ translateY: '-150%', opacity: 0 }}
										transition={{ duration: 0.2, ease: 'easeInOut', type: 'spring' }}
									>
										{ornament && (
											<span className='flex items-center'>
												<Icon icon={ornament} className={cn('text-emphasis-mid', size === 'sm' ? 'size-4' : 'size-5')} />
											</span>
										)}

										{(options ? options.find((opt) => opt.value === value)?.label : value) || placeholder}
									</motion.div>
								</AnimatePresence>

								<Icon icon='chevron-down' className={cn('text-primary', size === 'sm' ? 'size-4' : 'size-5')} />
							</button>
						</RippleContainer>

						{/* Drawer */}
						<Drawer {...drawerProps} open={open} onOpenChange={setOpen}>
							<DrawerContent>
								<DrawerTitle className='sr-only'>Escolha uma opção</DrawerTitle>
								{(title || description) && (
									<DrawerHeader>
										{title && <DrawerTitle>{title}</DrawerTitle>}
										{description && <DrawerDescription>{description}</DrawerDescription>}
									</DrawerHeader>
								)}

								{content?.({
									value,
									tempValue,
									setTempValue,
									confirm: () => {
										if (tempValue !== null) {
											onChange(tempValue);
										}
										setOpen(false);
									},
									close: () => setOpen(false),
								})}

								{options && (
									<DrawerFooter className={cn(footerClassname)}>
										<ButtonGroup orientation={'vertical'}>
											{options.map((option) => (
												<Button
													{...buttonsProps}
													key={option.label}
													variant={buttonsProps?.variant || 'secondary'}
													onClick={() => handleSelect(option.value)}
												>
													{option.label}
												</Button>
											))}
										</ButtonGroup>
									</DrawerFooter>
								)}
							</DrawerContent>
						</Drawer>
					</>
				);
			}}
		/>
	);
}
`;
