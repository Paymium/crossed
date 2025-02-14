/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { InputPart } from './InputPart';
import { memo, useId, useRef } from 'react';
import { DateInputProps, Value } from './types';
import { XBox } from '../../layout/XBox';
import { Text } from '../../typography/Text';
import { form } from '../../styles/form';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { useDateInput } from './useDateInput';
import { useFloating } from '../Select/useFloating';
import { Calendar } from './Calendar';
import { FloatingRef } from '../../overlay';

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

    return (
      <XBox
        pressable
        {...containerProps}
        ref={refs.setReference as any}
        justifyContent={'start'}
        alignItems={'center'}
        style={form.input}
        space={'xxs'}
      >
        {inputs.map(({ key, ...item }, i, a) => [
          <InputPart
            key={`${id}-${key}`}
            {...item}
            onFocus={calendarRef.current?.open}
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
          />
        )}
      </XBox>
    );
  }
);
DateInput.displayName = 'DateInput';
