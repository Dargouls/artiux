'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Select } from '@/artiux-components/select';
import { useForm } from 'react-hook-form';

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

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Select</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um seletor de opções em drawer, com suporte a ícone e descrição</p>
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
								description='Selecione o status'
								placeholder='Selecionar'
								content={() => <p className='text-muted-foreground text-sm'>O status define a situação do registro</p>}
								footerClassname='flex flex-wrap flex-row'
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
		</>
	);
}

const previewCode = `
import { Select } from '@/artiux-components/select';
import { useForm } from 'react-hook-form';

const { control } = useForm({ defaultValues: { status: '' } });

const options = [
	{ label: 'Ativo', value: 'ativo' },
	{ label: 'Inativo', value: 'inativo' },
];

<Select
	name='status'
	control={control}
	options={options}
	title='Status'
	description='Selecione o status'
	content={() => <p>O status define a situação do registro</p>}
	footerClassname='flex flex-wrap flex-row'
/>
`;

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
