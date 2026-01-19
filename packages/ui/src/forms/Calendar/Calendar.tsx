/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { XBox, YBox, YBoxProps } from '../../layout';
import {
  forwardRef,
  memo,
  RefAttributes,
  useId,
  useMemo,
  useState,
} from 'react';
import { useCalendar } from '@crossed/use-calendar';
import { IUseCalendarOptions } from '@crossed/use-calendar';
import { DayButton } from './DayButton';
import { capFirstLetter } from './utils';
import { WeekDay } from './WeekDay';
import { IDay } from '@crossed/use-calendar/src';
import { SelectYear } from './SelectYear';
import { SelectMonth } from './SelectMonth';
import { View } from 'react-native';

export type CalendarProps = Partial<Omit<IUseCalendarOptions, 'selectedDate'>> &
  Pick<YBoxProps, 'style'> & {
    locale?: string;
    selectedDate?: Date;
  };
export const Calendar = memo<CalendarProps & RefAttributes<View>>(
  forwardRef(({ locale = 'default', style, ...props }, ref) => {
    const { months, getDayProps, setMonth, setYear, monthsByYear } =
      useCalendar(props);
    const id = useId();
    const [yearSelected, setYearSelected] = useState(
      (props.selectedDate || new Date()).getFullYear()
    );

    const itemsMonth = useMemo(() => {
      const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
      });
      let availableMonths = monthsByYear.get(yearSelected);
      if (!availableMonths)
        availableMonths = new Set(Array.from(Array(12).keys()));

      return Array.from(availableMonths).map((month) => {
        const d = new Date(yearSelected, month);
        const nameMonth = formatter.format(d);
        return {
          label: capFirstLetter(nameMonth),
          value: month.toString(),
        };
      });
    }, [monthsByYear, yearSelected]);
    return (
      <YBox style={style} ref={ref}>
        {months.map(({ year, month, weeks }) => (
          <YBox key={`${id}-month-${month}`} space={'xs'}>
            <XBox alignItems={'stretch'} space={'xl'}>
              <SelectMonth
                month={month}
                onChange={setMonth}
                months={itemsMonth}
              />
              <SelectYear
                year={year}
                onChange={(e) => {
                  setYearSelected(e);
                  setYear(e);
                }}
                years={Array.from(monthsByYear).map(([y]) => y)}
              />
            </XBox>
            <YBox space={'xs'}>
              <WeekDay
                days={(weeks[0].length > 0 ? weeks[0] : weeks[1]) as IDay[]}
                locale={locale}
              />
              {weeks.map((week, i) => (
                <XBox key={`${id}-week-${i}`} justifyContent="between">
                  {week.map((day, j) => {
                    const { onClick, ...dayProps } = getDayProps({ day });

                    return (
                      <DayButton
                        key={`${id}-day-${j}`}
                        day={day}
                        {...(dayProps as any)}
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
  })
);
