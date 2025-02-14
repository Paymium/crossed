/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import * as df from './date-fns';
import {
  getCalendarMonth,
  getMinMaxDate,
  getStartEndDate,
  getValidDate,
} from './helpers';
import {
  buildGetDayProps,
  buildGetPrevNextMonthProps,
  buildGetPrevNextYearProps,
} from './props';
import {
  type IGetDayPropsOptions,
  type IMonth,
  type IUseCalendarOptions,
} from './types';

export type {
  ICalendarProps,
  IDay,
  IEvent,
  IGetDayPropsFn,
  IGetDayPropsOptions,
  IGetDayPropsReturns,
  IGetPrevNextPropsFn,
  IGetPrevNextPropsReturns,
  IMonth,
  IUseCalendarOptions,
  IWeek,
} from './types';

export function useCalendar(options?: Partial<IUseCalendarOptions>): {
  getDayProps: (_options: IGetDayPropsOptions) => { onClick: () => void };
  getNextMonthProps: () => {
    'aria-label': string;
    disabled: boolean;
    onClick: () => void;
    role: string;
    type: string;
  };
  getNextYearProps: () => {
    'aria-label': string;
    disabled: boolean;
    onClick: () => void;
    role: string;
    type: string;
  };
  getPrevMonthProps: () => {
    'aria-label': string;
    disabled: boolean;
    onClick: () => void;
    role: string;
    type: string;
  };
  getPrevYearProps: () => {
    'aria-label': string;
    disabled: boolean;
    onClick: () => void;
    role: string;
    type: string;
  };
  months: IMonth[];
  resetState: () => void;
  setMonth: (_month: number) => void;
  setYear: (_year: number) => void;
  monthsInRange: { month: number; year: number }[];
} {
  const {
    availableDates,
    events = [],
    firstDayOfWeek = 0,
    onDateSelected,
    selectedDate,
  } = options || {};
  const s = getValidDate(selectedDate);
  const [selected, setSelected] = useState<Date | undefined>(s);
  const [visibleMonth, setVisibleMonth] = useState(
    selected || new Date(Date.now())
  );

  useEffect(() => {
    if (!s || s?.getTime() === selected?.getTime()) return;
    setSelected(s);
    setVisibleMonth(s);
  }, [s?.getTime()]);

  let monthsToDisplay = options?.monthsToDisplay || 1;
  if (monthsToDisplay === Number.POSITIVE_INFINITY) {
    const d1 = options?.minDate || df.getFirstDayOfMonth(visibleMonth);
    const d2 = options?.maxDate || df.getLastDayOfMonth(visibleMonth);
    monthsToDisplay = df.differenceInMonths(d1, d2) + 1;
  }

  const { maxDate, minDate } = getMinMaxDate(options);
  const { end, start } = getStartEndDate({
    availableDates,
    maxDate,
    minDate,
    monthsToDisplay,
    visibleMonth,
  });

  const monthsInRange = useMemo(
    () => df.getMonthsInRange({ end, start }),
    [start.toISOString(), end.toISOString()]
  );
  const visibleMonthDate = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth()
  );
  const months = monthsInRange
    .filter(({ month, year }) => {
      const a = new Date(year, month);
      return a >= visibleMonthDate;
    })
    .slice(0, monthsToDisplay || 1)
    .map((month) =>
      getCalendarMonth({
        ...month,
        availableDates,
        events,
        firstDayOfWeek,
        maxDate,
        minDate,
        selected,
      })
    );

  const getDayProps = buildGetDayProps({ onDateSelected, setSelected });

  const [getPrevMonthProps, getNextMonthProps] = ['back', 'forward'].map(
    (direction) =>
      buildGetPrevNextMonthProps({
        direction,
        months,
        monthsInRange,
        setVisibleMonth,
      })
  );

  const [getPrevYearProps, getNextYearProps] = ['back', 'forward'].map(
    (direction) =>
      buildGetPrevNextYearProps({
        direction,
        monthsInRange,
        setVisibleMonth,
        visibleMonth,
      })
  );

  const setMonth = useCallback(
    (month: number) => {
      const newDate = new Date(visibleMonth);
      newDate.setMonth(month);
      setVisibleMonth(newDate);
    },
    [setVisibleMonth, visibleMonth]
  );
  const setYear = useCallback(
    (year: number) => {
      const newDate = new Date(visibleMonth);
      if (monthsInRange.length > 0) {
        const latestDate = monthsInRange[monthsInRange.length - 1];
        const firstDate = monthsInRange[0];

        if (latestDate.year < year) {
          newDate.setFullYear(latestDate.year);
        } else {
          newDate.setFullYear(year);
        }

        if (latestDate.month < newDate.getMonth()) {
          newDate.setMonth(latestDate.month);
        } else if (firstDate.month >= newDate.getMonth()) {
          newDate.setMonth(firstDate.month);
        }
        setVisibleMonth(newDate);
      }
    },
    [setVisibleMonth, visibleMonth, monthsInRange]
  );

  const resetState = () => {
    setSelected(getValidDate(selectedDate));
    setVisibleMonth(new Date(Date.now()));
  };
  return {
    getDayProps,
    getNextMonthProps,
    getNextYearProps,
    getPrevMonthProps,
    getPrevYearProps,
    months,
    resetState,
    monthsInRange,
    setMonth,
    setYear,
  };
}
