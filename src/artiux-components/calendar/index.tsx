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

interface MonthViewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	month: Date;
	isStartDay: (day: Date) => boolean;
	isEndDay: (day: Date) => boolean;
	isInRange: (day: Date) => boolean;
	getIndicator: (day: Date) => DateIndicator | undefined;
	onDayClick: (day: Date) => void;
	isDayDisabled: (day: Date) => boolean;
	allowClickOnDisabled?: boolean;
}

function MonthView({
	month,
	isStartDay,
	isEndDay,
	isInRange,
	getIndicator,
	onDayClick,
	isDayDisabled,
	allowClickOnDisabled,
	...props
}: MonthViewProps) {
	const monthDayjs = dayjs(month);
	const monthStart = monthDayjs.startOf('month');
	const monthEnd = monthDayjs.endOf('month');

	// Generate all days in the month
	const days: Date[] = [];
	let current = monthStart;
	while (current.isSameOrBefore(monthEnd, 'day')) {
		days.push(current.toDate());
		current = current.add(1, 'day');
	}

	// Get the day of week for the first day (0 = Sunday)
	const startDayOfWeek = monthStart.day();

	// Create empty cells for days before the month starts
	const emptyCells = Array(startDayOfWeek).fill(null);

	const monthName = monthDayjs.format('MMMM [de] YYYY');
	const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

	return (
		<div ref={props.ref} className='py-4'>
			<h3 className={cn('text-foreground mb-3', textVariants({ typography: 'h4' }))}>{capitalizedMonthName}</h3>
			<div className='grid grid-cols-7 gap-y-1'>
				{emptyCells.map((_, index) => (
					<div key={`empty-${index}`} className='h-10' />
				))}
				{days.map((day) => {
					const isStart = isStartDay(day);
					const isEnd = isEndDay(day);
					const inRange = isInRange(day);
					const indicator = getIndicator(day);
					const isSelected = isStart || isEnd;
					const isDisabled = isDayDisabled(day);

					// Check if this day is at the edge of a week row
					const dayOfWeek = dayjs(day).day(); // 0 = Sunday, 6 = Saturday
					const isFirstColumn = dayOfWeek === 0;
					const isLastColumn = dayOfWeek === 6;

					// Determine if range background should have rounded corners
					const shouldRoundLeft = inRange && (isFirstColumn || isStart);
					const shouldRoundRight = inRange && (isLastColumn || isEnd);

					return (
						<div key={day.toISOString()} className='relative flex h-10 items-center justify-center'>
							{/* Range background */}
							{inRange && (!isDisabled || allowClickOnDisabled) && (
								<div
									className={cn(
										'bg-primary/15 absolute inset-0 top-[5%] h-9',
										shouldRoundLeft && 'rounded-l-xl',
										shouldRoundRight && 'rounded-r-xl'
									)}
								/>
							)}

							{/* Day button */}
							<button
								type='button'
								onClick={() => onDayClick(day)}
								disabled={isDisabled && !allowClickOnDisabled}
								className={cn(
									isSelected ? textVariants({ typography: 'description-1' }) : textVariants({ typography: 'body' }),
									'relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all',
									isDisabled && 'text-emphasis-low line-through',
									isSelected && (!isDisabled || allowClickOnDisabled) && 'bg-primary text-primary-foreground font-medium shadow-lg',
									isDisabled && !allowClickOnDisabled && 'cursor-not-allowed',
									isDisabled && allowClickOnDisabled && 'cursor-pointer'
								)}
							>
								{dayjs(day).date()}

								{/* Indicator dot */}
								{indicator && (
									<div
										data-selected={isSelected}
										className='bg-primary data-[selected=true]:bg-primary-foreground absolute bottom-1 left-1/2 z-50 h-1 w-1 -translate-x-1/2 rounded-full'
									/>
								)}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export { Calendar };
