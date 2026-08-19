'use client';

import dayjs from 'dayjs';
import { createStore } from 'zustand/vanilla';

interface CalendarState {
	range: boolean;
	startDate: Date | null;
	endDate: Date | null;

	setRange: (value: boolean) => void;
	selectDate: (date: Date) => void;
	reset: () => void;
}

export type CalendarStore = ReturnType<typeof createCalendarStore>;

export function createCalendarStore() {
	return createStore<CalendarState>((set, get) => ({
		range: true,
		startDate: null,
		endDate: null,

		setRange: (value) =>
			set((state) => {
				if (!value) {
					return {
						range: false,
						startDate: state.startDate ?? dayjs().startOf('day').toDate(),
						endDate: null,
					};
				}
				return { range: true };
			}),

		selectDate: (date) => {
			const { range, startDate, endDate } = get();

			const selected = dayjs(date).startOf('day');

			// 🔹 SINGLE
			if (!range) {
				set({
					startDate: selected.toDate(),
					endDate: null,
				});
				return;
			}

			// 🔹 PRIMEIRA SELEÇÃO
			if (!startDate || (startDate && endDate)) {
				set({
					startDate: selected.toDate(),
					endDate: null,
				});
				return;
			}

			// 🔹 SEGUNDA SELEÇÃO
			const start = dayjs(startDate).startOf('day');

			if (selected.isBefore(start)) {
				set({
					startDate: selected.toDate(),
					endDate: start.toDate(),
				});
			} else {
				set({
					startDate: start.toDate(),
					endDate: selected.toDate(),
				});
			}
		},

		reset: () =>
			set({
				startDate: null,
				endDate: null,
			}),
	}));
}
