'use client';

import { Icon } from '@/artiux/components/icons';
import { Switch } from '@/artiux/components/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/dropdownMenu';
import { cn } from '@/lib/utils';

export function Customize({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>{children}</div>
		</>
	);
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className='bg-input/15 flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-xl'>
			<span className='text-muted-foreground shrink-0 text-sm'>{label}</span>
			{children}
		</div>
	);
}

interface ControlDropdownProps<T extends string> {
	label: string;
	value: T;
	options: readonly T[];
	onChange: (value: T) => void;
}

export function ControlDropdown<T extends string>({ label, value, options, onChange }: ControlDropdownProps<T>) {
	return (
		<ControlRow label={label}>
			<DropdownMenu>
				<DropdownMenuTrigger className='text-foreground flex items-center gap-1.5 text-sm capitalize outline-none'>
					{value}
					<Icon icon='chevron-down' className='size-3.5' />
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					{options.map((option) => (
						<DropdownMenuItem
							key={option}
							onSelect={() => onChange(option)}
							className={cn('capitalize', value === option ? 'text-primary' : 'text-foreground')}
						>
							{option}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</ControlRow>
	);
}

interface ControlSwitchProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function ControlSwitch({ label, checked, onChange }: ControlSwitchProps) {
	return (
		<ControlRow label={label}>
			<Switch checked={checked} onCheckedChange={onChange} />
		</ControlRow>
	);
}

interface ControlSliderProps {
	label: string;
	value: number;
	min?: number;
	max?: number;
	step?: number;
	unit?: string;
	onChange: (value: number) => void;
}

export function ControlSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }: ControlSliderProps) {
	return (
		<ControlRow label={label}>
			<div className='flex flex-1 items-center gap-3'>
				<input
					type='range'
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					className='accent-primary h-1 flex-1'
				/>
				<span className='text-foreground w-10 shrink-0 text-right text-sm'>
					{value}
					{unit}
				</span>
			</div>
		</ControlRow>
	);
}

interface ControlColorProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export function ControlColor({ label, value, onChange }: ControlColorProps) {
	return (
		<ControlRow label={label}>
			<div className='flex items-center gap-2'>
				<label className='border-border size-5 shrink-0 cursor-pointer rounded-md border' style={{ backgroundColor: value }}>
					<input type='color' value={value} onChange={(e) => onChange(e.target.value)} className='sr-only' />
				</label>
				<span className='text-muted-foreground font-mono text-xs'>{value}</span>
			</div>
		</ControlRow>
	);
}
