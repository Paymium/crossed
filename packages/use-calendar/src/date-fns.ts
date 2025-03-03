/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

type IGetDateFromArgs = {
  date: Date;
  days?: number;
  months?: number;
  weeks?: number;
  years?: number;
};

type IGetDaysOfMonthArgs = {
  month: number;
  year: number;
};

type IGetMonthsInRangeArgs = {
  end?: Date;
  start?: Date;
};

type IIsInRangeArgs = {
  date: Date;
  maxDate?: Date;
  minDate?: Date;
};

export function differenceInMonths(d1: Date, d2: Date) {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();

  return Math.max(0, months);
}

export function dtz(date?: Date | number | string) {
  if (date === undefined) {
    return new Date(Date.now());
  }

  const d = new Date(date);
  d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  return d;
}

export function getDateFrom(args: IGetDateFromArgs) {
  const { date, days, months, weeks, years } = args;

  let d = days || 0;
  if (weeks) {
    d = weeks * 7;
  }

  if (d) {
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + d);
    return newDate;
  }

  if (months) {
    const dayOfMonth = date.getDate();
    const endOfDesiredMonth = new Date(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + months + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    }

    return new Date(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
  }

  if (years) {
    const newDate = new Date(date.getTime());
    newDate.setFullYear(
      date.getFullYear() + years,
      date.getMonth(),
      date.getDate()
    );

    return newDate;
  }

  return date;
}

export function getDaysOfMonth(args: IGetDaysOfMonthArgs) {
  const { month, year } = args;
  let date = new Date(year, month, 1);

  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(date);
    date = getDateFrom({ date, days: 1 });
  }

  return days;
}

export function getFirstDayOfMonth(date: Date = new Date(Date.now())) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month, 1);
}

export function getLastDayOfMonth(date: Date = new Date(Date.now())) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return new Date(year, month + 1, 0);
}

export function getMonthsInRange(args: IGetMonthsInRangeArgs) {
  const { end = new Date(Date.now()), start = new Date(Date.now()) } = args;
  const months = new Map<string, { year: number; month: number }>();
  const monthsByYear = new Map<number, Set<number>>();

  // include last date in range
  const dayAfterEnd = getDateFrom({ date: end, days: 1 });
  let date = new Date(start);
  while (!isSameDay(date, dayAfterEnd)) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;
    if (!months.has(key)) {
      months.set(key, { month, year });
      const t = monthsByYear.get(year) || new Set();
      monthsByYear.set(year, t.add(month));
    }
    date = getDateFrom({ date, days: 1 });
  }

  return {
    monthsInRange: Array.from(months).map(([, value]) => value),
    monthsByYear,
  };
}

export function isFirstDayOfMonth(date: Date) {
  return date.getDate() === 1;
}

export function isInRange(args: IIsInRangeArgs) {
  const {
    date,
    minDate = new Date(Date.now()),
    maxDate = getLastDayOfMonth(minDate),
  } = args;

  const start = new Date(minDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(maxDate);
  end.setHours(23, 59, 59, 999);

  return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
}

export function isLastDayOfMonth(date: Date) {
  return getDateFrom({ date, days: 1 }).getMonth() !== date.getMonth();
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
