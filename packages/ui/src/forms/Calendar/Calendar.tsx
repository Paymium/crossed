/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { inlineStyle } from '@crossed/styled';
import { XBox, YBox } from '../../layout';
import { memo, useId } from 'react';
import { useCalendar } from '@crossed/use-calendar';
import { IUseCalendarOptions } from '@crossed/use-calendar';
import { DayButton } from './DayButton';
import { capFirstLetter } from './utils';
import { WeekDay } from './WeekDay';
import { IDay } from '@crossed/use-calendar/src';
import { SelectYear } from './SelectYear';
import { SelectMonth } from './SelectMonth';

const style = inlineStyle(({ colors, space }) => ({
  base: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.primary,
    padding: space.lg,
    borderRadius: 16,
  },
}));

export interface CalendarProps extends Partial<IUseCalendarOptions> {
  locale?: string;
}
export const Calendar = memo<CalendarProps>(
  ({ locale = 'default', ...props }) => {
    const { months, getDayProps, setMonth, setYear, monthsInRange } =
      useCalendar({
        ...props,
      });
    const id = useId();

    return (
      <YBox style={style}>
        {months.map(({ year, month, weeks }) => (
          <YBox key={`${id}-month-${month}`} space={'md'}>
            <XBox alignItems={'stretch'} space={'md'}>
              <SelectMonth
                month={month}
                onChange={setMonth}
                months={monthsInRange.reduce((acc, m) => {
                  if (m.year === year) {
                    const d = new Date(m.year, m.month);
                    const nameMonth = d.toLocaleString(locale, {
                      month: 'long',
                    });
                    acc.push({
                      label: capFirstLetter(nameMonth),
                      value: m.month,
                    });
                  }
                  return acc;
                }, [])}
              />
              <SelectYear
                year={year}
                onChange={setYear}
                years={monthsInRange.reduce((acc, m) => {
                  if (!acc.includes(m.year)) acc.push(m.year);
                  return acc;
                }, [])}
              />
            </XBox>
            <YBox space={'xxs'}>
              <WeekDay days={weeks[0] as IDay[]} locale={locale} />
              {weeks.map((week, i) => (
                <XBox
                  key={`${id}-week-${i}`}
                  space={'xxs'}
                  justifyContent="between"
                >
                  {week.map((day, j) => {
                    const { onClick, ...props } = getDayProps({ day });

                    return (
                      <DayButton
                        key={`${id}-day-${j}`}
                        day={day}
                        {...props}
                        onPress={onClick}
                      />
                    );
                  })}
                </XBox>
              ))}
            </YBox>
          </YBox>
        ))}
      </YBox>
    );
  }
);
