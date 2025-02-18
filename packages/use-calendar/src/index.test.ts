/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { dtz } from './date-fns';

import { useCalendar } from './index';

describe('use-calendar', () => {
  const dateNowSpy = vi
    .spyOn(Date, 'now')
    .mockReturnValue(new Date('2022-07-02T00:00:00').getTime());

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  describe('default', () => {
    it('pads last days of last month', () => {
      const { result } = renderHook(() =>
        useCalendar({
          maxDate: dtz('2022-07-31'),
          minDate: dtz('2022-07-01'),
        })
      );
      const { current: actual } = result;

      const expected = [
        {
          date: dtz('2022-06-26'),
          isAdjacentMonth: true,
          isWeekend: true,
        },
        {
          date: dtz('2022-06-27'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-28'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-29'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-30'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-07-01'),
          isSelectable: true,
        },
        {
          date: dtz('2022-07-02'),
          isSelectable: true,
          isToday: true,
          isWeekend: true,
        },
      ];
      expect(actual.months[0].weeks[0]).toStrictEqual(expected);
    });

    it('pads first days of next month', () => {
      const { result } = renderHook(() =>
        useCalendar({
          maxDate: dtz('2022-07-31'),
          minDate: dtz('2022-07-01'),
        })
      );
      const { current: actual } = result;

      const expected = [
        {
          date: dtz('2022-07-31'),
          isSelectable: true,
          isWeekend: true,
        },
        {
          date: dtz('2022-08-01'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-08-02'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-08-03'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-08-04'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-08-05'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-08-06'),
          isAdjacentMonth: true,
          isWeekend: true,
        },
      ];
      expect(actual.months[0].weeks[5]).toEqual(expected);
    });
  });

  describe('firstDayOfWeek', () => {
    it('pads last days of last month', () => {
      const { result } = renderHook(() =>
        useCalendar({
          firstDayOfWeek: 1,
          maxDate: dtz('2022-07-31'),
          minDate: dtz('2022-07-01'),
        })
      );
      const { current: actual } = result;

      const expected = [
        {
          date: dtz('2022-06-27'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-28'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-29'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-06-30'),
          isAdjacentMonth: true,
        },
        {
          date: dtz('2022-07-01'),
          isSelectable: true,
        },
        {
          date: dtz('2022-07-02'),
          isSelectable: true,
          isToday: true,
        },
        {
          date: dtz('2022-07-03'),
          isSelectable: true,
        },
      ];
      expect(actual.months[0].weeks[0]).toMatchObject(expected);
    });

    it('pads first days of next month', () => {
      const { result } = renderHook(() =>
        useCalendar({
          firstDayOfWeek: 1,
          maxDate: dtz('2022-07-31'),
          minDate: dtz('2022-07-01'),
        })
      );
      const { current: actual } = result;

      const expected = [
        '2022-07-25',
        '2022-07-26',
        '2022-07-27',
        '2022-07-28',
        '2022-07-29',
        '2022-07-30',
        '2022-07-31',
      ].map((dateStr) => ({
        date: dtz(dateStr),
        isSelectable: true,
      }));
      expect(actual.months[0].weeks[4]).toMatchObject(expected);
    });
  });

  describe('with selected', () => {
    it('returns selected date', () => {
      const { result } = renderHook(() =>
        useCalendar({ selectedDate: dtz('2022-07-03') })
      );
      const { current: actual } = result;

      expect(actual.months[0].weeks[1][0]!.isSelected).toBe(true);
    });

    it('handles invalid dates', () => {
      const selectedDate = 'foobar';
      const { result } = renderHook(() => useCalendar({ selectedDate }));
      const { current: actual } = result;

      expect(actual.months[0].weeks[1][0]!.isSelected).toBeUndefined();
    });

    it("sets the current month to the selected date's month", () => {
      const props = {
        maxDate: dtz('2022-08-31'),
        minDate: dtz('2022-06-01'),
        selectedDate: dtz('2022-07-03'),
      };

      const { result } = renderHook(() => useCalendar(props));
      expect(result.current.months[0].month).toBe(6);
    });

    it('still returns current month if not provided selected date', () => {
      const { result } = renderHook(() => useCalendar());
      const { current: actual } = result;

      expect(actual.months).toHaveLength(1);
    });
  });

  describe('monthsToDisplay', () => {
    it('returns default number of months to display (1)', () => {
      const { result } = renderHook(() => useCalendar());
      const { months } = result.current;

      expect(months).toHaveLength(1);
    });

    it('returns all months for available dates, only selected month (1)', () => {
      const args = {
        maxDate: dtz('2023-03-25'),
        minDate: dtz('2022-12-25'),
        selectedDate: dtz('2022-12-25'),
      };
      const { result } = renderHook(() => useCalendar(args));
      const { months } = result.current;

      expect(months).toHaveLength(1);
    });

    it('returns number of months for available dates', () => {
      const args = {
        availableDates: [dtz('2022-12-25'), dtz('2023-02-25')],
      };
      const { result } = renderHook(() => useCalendar(args));
      const { months } = result.current;

      expect(months).toHaveLength(1);
    });

    it('returns number of months for available dates', () => {
      const args = {
        maxDate: dtz('2023-03-25'),
        minDate: dtz('2022-12-25'),
        monthsToDisplay: Number.POSITIVE_INFINITY,
        selectedDate: dtz('2022-12-25'),
      };
      const { result } = renderHook(() => useCalendar(args));
      const { months } = result.current;

      expect(months).toHaveLength(4);
    });

    it('returns number of months for available dates', () => {
      const args = { monthsToDisplay: Number.POSITIVE_INFINITY };
      const { result } = renderHook(() => useCalendar(args));
      const { months } = result.current;

      expect(months).toHaveLength(1);
    });
  });

  describe('availableDates', () => {
    it('handles empty list of available dates', () => {
      const { result } = renderHook(() => useCalendar({ availableDates: [] }));
      const { current: actual } = result;

      expect(actual.months[0].weeks[0][5]!.isSelectable).toBeUndefined();
    });

    it('returns getNextMonthProps', () => {
      const args = {
        availableDates: [dtz('2022-06-02')],
      };
      const { result } = renderHook(() => useCalendar(args));
      const { getNextMonthProps } = result.current;
      const actual = getNextMonthProps();

      expect(actual.disabled).toBe(true);
    });
  });
});
