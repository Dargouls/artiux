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
								<DrawerTitle className='sr-only'>Escolha uma opção</DrawerTitle>
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
