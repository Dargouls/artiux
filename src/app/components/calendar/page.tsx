'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Calendar } from '@/artiux-components/calendar';

export default function CalendarComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Calendar</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um calendário para seleção de datas</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add dayjs zustand' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='flex flex-wrap gap-8'>
						<div className='flex flex-col gap-2'>
							<span className='text-muted-foreground text-sm'>Intervalo de datas</span>
							<Calendar range />
						</div>
						<div className='flex flex-col gap-2'>
							<span className='text-muted-foreground text-sm'>Data única (sem passadas)</span>
							<Calendar range={false} disablePastDates />
						</div>
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { Calendar } from '@/artiux-components/calendar';

// intervalo de datas
<Calendar range />

// data única, bloqueando datas passadas
<Calendar range={false} disablePastDates />
`;

const componentCode = `
'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

import { cn } from '@/lib/utils';
import * as React from 'react';
import { textVariants } from '../text';
import { useCalendarStore } from './useCalendar';

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
	const { startDate, endDate, selectDate, setRange } = useCalendarStore();

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
