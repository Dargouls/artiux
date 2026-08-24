'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlSlider, ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';

import { Aside } from '@/artiux/components/aside';
import { Calendar } from '@/artiux/components/calendar';

const asideItems = [
	{ id: 'preview', label: 'Prévia' },
	{ id: 'props', label: 'Props' },
	{ id: 'code', label: 'Instalação' },
];

const WEEKEND_DAYS = [0, 6];

export default function CalendarComponent() {
	const [range, setRange] = useState(true);
	const [disablePastDates, setDisablePastDates] = useState(true);
	const [allowClickOnDisabled, setAllowClickOnDisabled] = useState(false);
	const [disableWeekends, setDisableWeekends] = useState(false);
	const [monthsBefore, setMonthsBefore] = useState(2);
	const [monthsAfter, setMonthsAfter] = useState(12);

	const props = [
		range ? 'range' : 'range={false}',
		disablePastDates ? null : 'disablePastDates={false}',
		allowClickOnDisabled ? 'allowClickOnDisabled' : null,
		disableWeekends ? 'disabledWeekdays={[0, 6]}' : null,
		monthsBefore === 12 ? null : `monthsBefore={${monthsBefore}}`,
		monthsAfter === 12 ? null : `monthsAfter={${monthsAfter}}`,
	]
		.filter(Boolean)
		.join(' ');

	const previewCode = `
import { Calendar } from '@/artiux/components/calendar';

<Calendar ${props} />
`;

	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Calendar</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>Um calendário para seleção de datas</p>
				</div>

				<section id='preview' className='my-8 scroll-mt-24'>
					<PreviewCode code={previewCode}>
						<div className='flex flex-wrap items-start gap-8'>
							<div className='flex flex-col gap-2'>
								<span className='text-muted-foreground text-sm'>Preview interativo ({range ? 'intervalo' : 'data unica'})</span>
								<Calendar
									key={range ? 'range' : 'single'}
									range={range}
									disablePastDates={disablePastDates}
									allowClickOnDisabled={allowClickOnDisabled}
									disabledWeekdays={disableWeekends ? WEEKEND_DAYS : []}
									monthsBefore={monthsBefore}
									monthsAfter={monthsAfter}
								/>
							</div>
						</div>
					</PreviewCode>
				</section>

				<section id='customize' className='my-8 scroll-mt-24'>
					<Customize>
						<ControlSwitch label='Range' checked={range} onChange={setRange} />
						<ControlSwitch label='Disable past dates' checked={disablePastDates} onChange={setDisablePastDates} />
						<ControlSwitch label='Allow click on disabled' checked={allowClickOnDisabled} onChange={setAllowClickOnDisabled} />
						<ControlSwitch label='Disable weekends' checked={disableWeekends} onChange={setDisableWeekends} />
						<ControlSlider label='Months before' value={monthsBefore} min={0} max={24} onChange={setMonthsBefore} />
						<ControlSlider label='Months after' value={monthsAfter} min={0} max={24} onChange={setMonthsAfter} />
					</Customize>
				</section>

				<section id='props' className='my-8 scroll-mt-24'>
					<PropsTable rows={propRows} />
				</section>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add dayjs zustand' code={componentCode} fileName='artiux/components/calendar/index.tsx' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const propRows = [
	{ property: 'range', type: 'boolean', default: 'false', description: 'Habilita a seleção de um intervalo de datas (início e fim).' },
	{
		property: 'onRangeChange',
		type: '(start: Date | null, end: Date | null) => void',
		description: 'Callback disparado quando as datas selecionadas mudam.',
	},
	{ property: 'availability', type: 'Record<string, boolean> | string[]', description: 'Define a disponibilidade de cada dia.' },
	{ property: 'indicators', type: 'DateIndicator[]', default: '[]', description: 'Marcadores coloridos exibidos em datas específicas.' },
	{ property: 'monthsBefore', type: 'number', default: '12', description: 'Quantidade de meses exibidos antes do mês atual.' },
	{ property: 'monthsAfter', type: 'number', default: '12', description: 'Quantidade de meses exibidos após o mês atual.' },
	{ property: 'disablePastDates', type: 'boolean', default: 'true', description: 'Bloqueia a seleção de datas anteriores a hoje.' },
	{ property: 'disabledDates', type: 'Date[]', default: '[]', description: 'Lista de datas específicas desabilitadas para seleção.' },
	{
		property: 'disabledWeekdays',
		type: 'number[]',
		default: '[]',
		description: 'Dias da semana desabilitados (0 = domingo … 6 = sábado).',
	},
	{
		property: 'allowClickOnDisabled',
		type: 'boolean',
		default: 'false',
		description: 'Permite clicar em dias desabilitados mesmo assim.',
	},
];

const componentCode = `
'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

import { cn } from '@/lib/utils';
import * as React from 'react';
import { useStore } from 'zustand';
import { textVariants } from '../text';
import { createCalendarStore } from './useCalendar';

export interface DateIndicator {
	date: Date;
	color?: string;
}

export interface CalendarProps {
	startDate?: Date | null;
	endDate?: Date | null;
	range?: boolean;
	onRangeChange?: (start: Date | null, end: Date | null) => void;
	availability?: Record<string, boolean> | string[];
	indicators?: DateIndicator[];
	className?: string;
	monthsBefore?: number;
	monthsAfter?: number;
	disablePastDates?: boolean;
	disabledDates?: Date[];
	disabledWeekdays?: number[];
	allowClickOnDisabled?: boolean;
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function Calendar({
	range = false,
	onRangeChange,
	indicators = [],
	className,
	monthsBefore = 12,
	monthsAfter = 12,
	disablePastDates = true,
	disabledDates = [],
	disabledWeekdays = [],
	allowClickOnDisabled = false,
}: CalendarProps) {
	const [store] = React.useState(() => createCalendarStore());
	const { startDate, endDate, selectDate, setRange } = useStore(store);

	const today = dayjs();
	const scrollContainerRef = React.useRef<HTMLDivElement>(null);
	const currentMonthRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setRange(range);
	}, [range, setRange]);

	React.useEffect(() => {
		onRangeChange?.(startDate, endDate);
	}, [startDate, endDate, onRangeChange]);

	const months = React.useMemo(() => {
		const result: dayjs.Dayjs[] = [];
		for (let i = -monthsBefore; i <= monthsAfter; i++) {
			result.push(today.add(i, 'month'));
		}
		return result;
	}, [monthsBefore, monthsAfter]);

	React.useEffect(() => {
		if (currentMonthRef.current && scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const currentMonth = currentMonthRef.current;

			const containerTop = container.getBoundingClientRect().top;
			const monthTop = currentMonth.getBoundingClientRect().top;
			const relativePosition = monthTop - containerTop;

			container.scrollTo({
				top: container.scrollTop + relativePosition,
				behavior: 'smooth',
			});
		}
	}, []);

	const isDayDisabled = (day: Date) => {
		if (disablePastDates && dayjs(day).isBefore(dayjs(), 'day')) {
			return true;
		}
		if (disabledWeekdays.length > 0 && disabledWeekdays.includes(dayjs(day).day())) {
			return true;
		}
		return disabledDates.some((d) => dayjs(day).isSame(dayjs(d), 'day'));
	};

	const isStartDay = (day: Date) => !!(startDate && dayjs(day).isSame(dayjs(startDate), 'day'));

	const isEndDay = (day: Date) => !!(endDate && dayjs(day).isSame(dayjs(endDate), 'day'));

	const isInRange = (day: Date) => {
		if (!range || !startDate || !endDate) return false;
		return dayjs(day).isBetween(dayjs(startDate), dayjs(endDate), 'day', '[]');
	};

	const getIndicator = (date: Date) => {
		const key = dayjs(date).format('YYYY-MM-DD');

		return indicators.find((ind) => dayjs(ind.date).format('YYYY-MM-DD') === key);
	};

	return (
		<div className={cn('flex h-80 max-w-[500px] flex-col overflow-hidden', className)}>
			<div className='sticky top-0 z-10 pb-2'>
				<div className='grid grid-cols-7 gap-1 px-2'>
					{WEEKDAYS.map((day, index) => (
						<div
							key={index}
							className={cn('text-emphasis-low flex items-center justify-center', textVariants({ typography: 'description-1' }))}
						>
							{day}
						</div>
					))}
				</div>
			</div>

			<div ref={scrollContainerRef} className='scrollbar-none flex-1 overflow-y-auto px-2'>
				{months.map((month, monthIndex) => {
					const isCurrentMonth = month.isSame(today, 'month');

					return (
						<MonthView
							key={monthIndex}
							ref={isCurrentMonth ? currentMonthRef : null}
							month={month.toDate()}
							isStartDay={isStartDay}
							isEndDay={isEndDay}
							isInRange={isInRange}
							getIndicator={getIndicator}
							allowClickOnDisabled={allowClickOnDisabled}
							onDayClick={(day) => {
								if (!isDayDisabled(day) || allowClickOnDisabled) {
									selectDate(day);
								}
							}}
							isDayDisabled={isDayDisabled}
						/>
					);
				})}
			</div>
		</div>
	);
}

export { Calendar };
`;
