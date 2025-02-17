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
import { IUseCalendarOptions } from './types';
export * from './types';

export function useCalendar(options?: Partial<IUseCalendarOptions>) {
  const {
    availableDates,
    events = [],
    firstDayOfWeek = 0,
    onDateSelected,
    selectedDate,
  } = options || {};

  const initialSelected = useMemo(
    () => getValidDate(selectedDate),
    [selectedDate]
  );

  const [selected, setSelected] = useState<Date | undefined>(initialSelected);
  const [visibleMonth, setVisibleMonth] = useState(
    initialSelected || new Date()
  );

  useEffect(() => {
    if (initialSelected?.getTime() !== selected?.getTime()) {
      setSelected(initialSelected);
      setVisibleMonth(initialSelected || new Date());
    }
  }, [initialSelected]);

  let monthsToDisplay = options?.monthsToDisplay || 1;

  if (monthsToDisplay === Number.POSITIVE_INFINITY) {
    const minDate = options?.minDate || df.getFirstDayOfMonth(visibleMonth);
    const maxDate = options?.maxDate || df.getLastDayOfMonth(visibleMonth);
    monthsToDisplay = df.differenceInMonths(minDate, maxDate) + 1;
  }

  const { maxDate, minDate } = useMemo(() => getMinMaxDate(options), [options]);

  const { start, end } = useMemo(
    () =>
      getStartEndDate({
        availableDates,
        maxDate,
        minDate,
        monthsToDisplay,
        visibleMonth,
      }),
    [availableDates, maxDate, minDate, monthsToDisplay, visibleMonth]
  );

  const { monthsInRange, monthsByYear } = useMemo(() => {
    return df.getMonthsInRange({ start, end });
  }, [start, end]);

  const months = useMemo(() => {
    const visibleMonthTime = visibleMonth.getTime();
    const result = [];
    for (const { month, year } of monthsInRange) {
      const date = new Date(year, month);
      if (date.getTime() >= visibleMonthTime) {
        result.push(
          getCalendarMonth({
            month,
            year,
            availableDates,
            events,
            firstDayOfWeek,
            maxDate,
            minDate,
            selected,
          })
        );
        if (result.length >= monthsToDisplay) break;
      }
    }
    return result;
  }, [
    monthsInRange,
    visibleMonth,
    availableDates,
    events,
    firstDayOfWeek,
    maxDate,
    minDate,
    selected,
    monthsToDisplay,
  ]);

  const getDayProps = useMemo(
    () => buildGetDayProps({ onDateSelected, setSelected }),
    [onDateSelected]
  );

  const getPrevMonthProps = useMemo(
    () =>
      buildGetPrevNextMonthProps({
        direction: 'back',
        months,
        monthsInRange,
        setVisibleMonth,
      }),
    [months, monthsInRange]
  );

  const getNextMonthProps = useMemo(
    () =>
      buildGetPrevNextMonthProps({
        direction: 'forward',
        months,
        monthsInRange,
        setVisibleMonth,
      }),
    [months, monthsInRange]
  );

  const getPrevYearProps = useMemo(
    () =>
      buildGetPrevNextYearProps({
        direction: 'back',
        monthsInRange,
        setVisibleMonth,
        visibleMonth,
      }),
    [monthsInRange, visibleMonth]
  );

  const getNextYearProps = useMemo(
    () =>
      buildGetPrevNextYearProps({
        direction: 'forward',
        monthsInRange,
        setVisibleMonth,
        visibleMonth,
      }),
    [monthsInRange, visibleMonth]
  );

  const setMonth = useCallback(
    (month: number) =>
      setVisibleMonth((prev) => new Date(prev.getFullYear(), month)),
    []
  );

  const setYear = useCallback(
    (year: number) =>
      setVisibleMonth((prev) => new Date(year, prev.getMonth())),
    []
  );

  const resetState = useCallback(() => {
    setSelected(initialSelected);
    setVisibleMonth(initialSelected || new Date());
  }, [initialSelected]);

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
    monthsByYear,
  };
}
