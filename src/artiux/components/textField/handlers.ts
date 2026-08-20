import { InputHTMLAttributes } from 'react';

export type CustomType = 'currency';

function formatCurrencyDisplay(rawDigits: string): string {
	const digits = rawDigits.replace(/\D/g, '');
	const numeric = digits ? parseInt(digits, 10) / 100 : 0;
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	}).format(numeric);
}

function toDecimalValue(rawDigits: string): number {
	const digits = rawDigits.replace(/\D/g, '');
	return digits ? parseInt(digits, 10) / 100 : 0;
}

export interface CustomTypeState {
	display: string;
	prevNumeric: number;
}

export interface CustomTypeHandler {
	initialDisplay: () => string;
	syncDisplay: (formValue: unknown, state: CustomTypeState) => CustomTypeState | null;
	onChange: (raw: string) => { display: string; formValue: unknown; prevNumeric: number };
	inputProps: (state: CustomTypeState) => Partial<InputHTMLAttributes<HTMLInputElement>>;
}

export const customTypeHandlers: Record<CustomType, CustomTypeHandler> = {
	currency: {
		initialDisplay: () => formatCurrencyDisplay('0'),
		syncDisplay: (formValue, state) => {
			const numeric = typeof formValue === 'number' ? formValue : 0;
			if (numeric === state.prevNumeric) return null;
			const digits = Math.round(numeric * 100).toString();
			return { display: formatCurrencyDisplay(digits), prevNumeric: numeric };
		},
		onChange: (raw) => {
			const decimal = toDecimalValue(raw);
			return { display: formatCurrencyDisplay(raw), formValue: decimal, prevNumeric: decimal };
		},
		inputProps: (state) => ({ value: state.display, inputMode: 'numeric' }),
	},
};
