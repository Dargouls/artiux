'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';

import { Icon, IconName } from '@/artiux/components/icons';
import { RippleContainer } from '@/artiux/components/rippleContainer';
import { Text, textVariants } from '@/artiux/components/text';
import { cn } from '@/lib/utils';
import InputMask from '@mona-health/react-input-mask';

/* =========================================================
 * Custom Types (currency etc)
 * ======================================================= */

export type CustomTypeHandler = {
	initialDisplay: () => string;
	syncDisplay: (value: unknown, state: CustomTypeState) => CustomTypeState | null;
	onChange: (value: string) => {
		display: string;
		formValue: number | string;
		prevNumeric: number;
	};
	inputProps: (state: CustomTypeState) => Record<string, unknown>;
};

export type CustomTypeState = {
	display: string;
	prevNumeric: number;
};

export const customTypeHandlers = {
	currency: {
		initialDisplay: (): string => '',

		syncDisplay(value: unknown, state: CustomTypeState): CustomTypeState | null {
			if (typeof value !== 'number') return null;

			const display = value.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});

			if (display === state.display) return null;

			return {
				display,
				prevNumeric: value,
			};
		},

		onChange(value: string) {
			const numeric = Number(value.replace(/\D/g, '')) / 100;

			const display = numeric.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});

			return {
				display,
				formValue: numeric,
				prevNumeric: numeric,
			};
		},

		inputProps(state: CustomTypeState): Record<string, unknown> {
			return {
				value: state.display,
			};
		},
	},
} satisfies Record<string, CustomTypeHandler>;

export type CustomType = keyof typeof customTypeHandlers;

/* =========================================================
 * Props
 * ======================================================= */

export interface TextFieldProps<TFieldValues extends FieldValues = FieldValues> extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size' | 'name'
> {
	name: Path<TFieldValues>;
	control?: Control<TFieldValues>;
	placeholder?: string;
	size?: 'sm' | 'lg';
	mask?: string;
	id?: string;
	className?: string;

	ornament?: IconName;
	ornamentClassname?: string;
	ornamentPosition?: 'left' | 'right';
	ornamentProps?: React.HTMLAttributes<HTMLDivElement>;

	typography?: VariantProps<typeof textVariants>['typography'];

	error?: boolean;
	helperText?: string;

	customType?: CustomType;
}

/* =========================================================
 * Styles
 * ======================================================= */

export const textFieldVariants = cva(
	'w-full outline-none bg-input transition-all rounded-xl disabled:cursor-not-allowed disabled:opacity-50 duration-150 ease-out',
	{
		variants: {
			size: {
				lg: 'px-4 py-3 text-base',
				sm: 'px-3 py-1.5 text-sm',
			},
			error: {
				true: 'bg-destructive/10 focus:bg-destructive/10',
				false: '',
			},
		},
		defaultVariants: {
			size: 'lg',
			error: false,
		},
	}
);

/* =========================================================
 * Component
 * ======================================================= */

function TextFieldComponent<TFieldValues extends FieldValues = FieldValues>(
	{
		name,
		control: controlProp,
		placeholder,
		size,
		type = 'text',
		mask,
		id,
		className,
		ornament,
		ornamentClassname,
		ornamentPosition,
		ornamentProps,
		typography = 'body',
		error = false,
		helperText,
		customType,
		...props
	}: TextFieldProps<TFieldValues>,
	ref: React.Ref<HTMLInputElement>
) {
	const context = useFormContext<TFieldValues>();
	const control = controlProp ?? context?.control;

	const handler = customType ? customTypeHandlers[customType] : null;

	const [customState, setCustomState] = useState<CustomTypeState>(() =>
		handler ? { display: handler.initialDisplay(), prevNumeric: 0 } : { display: '', prevNumeric: 0 }
	);

	const inputClassName = cn(
		textFieldVariants({ size, error }),
		textVariants({ typography }),
		ornamentPosition === 'left' ? 'pl-12' : ornamentPosition === 'right' ? 'pr-12' : '',
		className
	);

	const renderOrnament = () => {
		if (!ornament) return null;

		return (
			<div
				{...ornamentProps}
				className={cn('absolute top-1/2 size-5 -translate-y-1/2', ornamentPosition === 'left' ? 'left-4' : 'right-4')}
			>
				<Icon icon={ornament} className={cn('text-emphasis-mid', size === 'sm' ? 'size-4' : 'size-5', ornamentClassname)} />
			</div>
		);
	};

	const renderInput = (fieldProps: Record<string, unknown> = {}) => (
		<div className='w-full'>
			<RippleContainer>
				<div className='relative rounded-xl focus-within:outline-none'>
					{mask ? (
						<InputMask
							{...fieldProps}
							ref={ref as React.Ref<HTMLInputElement>}
							id={id}
							mask={mask}
							className={inputClassName}
							placeholder={placeholder}
						/>
					) : (
						<input {...props} {...fieldProps} ref={ref} type={type} id={id} className={inputClassName} placeholder={placeholder} />
					)}

					{renderOrnament()}
				</div>
			</RippleContainer>

			{helperText && (
				<Text typography='description-2' className={cn('mt-1.5', error ? 'text-destructive' : 'text-muted-foreground')}>
					{helperText}
				</Text>
			)}
		</div>
	);

	if (!control) {
		return renderInput({ name });
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				if (handler) {
					const synced = handler.syncDisplay(field.value, customState);
					if (synced) setCustomState(synced);
				}

				const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					if (!handler) return field.onChange(e.target.value);

					const { display, formValue, prevNumeric } = handler.onChange(e.target.value);

					setCustomState({ display, prevNumeric });

					field.onChange(formValue as PathValue<TFieldValues, Path<TFieldValues>>);
				};

				const customProps = handler
					? {
							...handler.inputProps(customState),
							onChange: handleChange,
						}
					: {};

				return renderInput({
					...field,
					...customProps,
					onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
						field.onBlur();
						props.onBlur?.(e);
					},
				});
			}}
		/>
	);
}

export const TextField = forwardRef(TextFieldComponent) as <TFieldValues extends FieldValues = FieldValues>(
	props: TextFieldProps<TFieldValues> & {
		ref?: React.Ref<HTMLInputElement>;
	}
) => React.ReactElement;
