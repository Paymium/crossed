/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { InputPart } from './InputPart';
import { memo, useCallback, useId, useRef } from 'react';
import { DateInputProps, Value } from './types';
import { XBox } from '../../layout/XBox';
import { Text } from '../../typography/Text';
import { form } from '../../styles/form';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { useDateInput } from './useDateInput';
import { useFloating } from '../Select/useFloating';
import { Calendar } from './Calendar';
import { FloatingRef } from '../../overlay';
import { growStyles } from '../../styles';

const convertToDate = (e?: Partial<Value>) => {
  const args = [e?.year, e?.month - 1, e?.day].filter(
    (l) => typeof l === 'number'
  );
  const date = args.length > 0 ? new Date(...(args as [])) : undefined;
  if (!date || isNaN(date.getTime())) return undefined;
  return date;
};

export const DateInput = memo(
  ({
    value: valueProps,
    onChange: onChangeProps,
    format = 'yyyy-mm-dd',
    locale = 'en',
    picker,
    placeholder = {},
    minDate,
    maxDate,
    availableDates,
    firstDayOfWeek,
    events,
    monthsToDisplay,
  }: DateInputProps) => {
    const { refs, floatingStyles } = useFloating();
    const calendarRef = useRef<FloatingRef>(null);
    const id = useId();
    const { inputs, separator, setWithDate, value, containerProps } =
      useDateInput({
        locale,
        format,
        value: valueProps,
        placeholder,
        onChange: (e) => {
          const args = [e.year, e.month - 1, e.day].filter(
            (l) => typeof l === 'number'
          );
          const date = new Date(...(args as []));
          onChangeProps?.(date);
        },
      });

    const handleFocusInput = useCallback(() => {
      calendarRef.current?.open();
    }, []);

    return (
      <XBox
        pressable
        {...containerProps}
        ref={refs.setReference as any}
        style={composeStyles(
          form.input,
          inlineStyle(() => ({
            base: {
              justifyContent: 'flex-start',
              paddingVertical: 0,
            },
          }))
        )}
      >
        <XBox style={growStyles.on} alignItems="center">
          {inputs.map(({ key, ...item }, i, a) => [
            <InputPart
              key={`${id}-${key}`}
              {...item}
              onFocus={handleFocusInput}
            />,
            i + 1 !== a.length ? (
              <Text
                key={`${id}-${key}-separator`}
                style={composeStyles(
                  form.placeholder,
                  inlineStyle(() => ({ base: { marginTop: 1 } }))
                )}
              >
                {separator}
              </Text>
            ) : null,
          ])}
        </XBox>
        {picker && format === 'yyyy-mm-dd' && (
          <Calendar
            ref={calendarRef}
            selectedDate={convertToDate(value)}
            onDateSelected={(e) => {
              setWithDate(e.date);
            }}
            floatingStyles={floatingStyles}
            setFloating={refs.setFloating}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            availableDates={availableDates}
            firstDayOfWeek={firstDayOfWeek}
            events={events}
            monthsToDisplay={monthsToDisplay}
          />
        )}
      </XBox>
    );
  }
);
DateInput.displayName = 'DateInput';
