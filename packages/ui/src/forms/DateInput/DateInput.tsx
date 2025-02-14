/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { InputPart } from './InputPart';
import { memo, useId } from 'react';
import { DateInputProps } from './types';
import { XBox } from '../../layout/XBox';
import { Text } from '../../typography/Text';
import { form } from '../../styles/form';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { useDateInput } from './useDateInput';
import { useFloating } from '../Select/useFloating';
import { Calendar } from './Calendar';

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
    const id = useId();
    const { inputs, separator, setWithDate } = useDateInput({
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
        ref={refs.setReference as any}
        justifyContent={'start'}
        alignItems={'center'}
        style={form.input}
        space={'xxs'}
      >
        {inputs.map(({ key, ...item }, i, a) => [
          <InputPart key={`${id}-${key}`} {...item} />,
          i + 1 !== a.length ? (
            <Text
              style={composeStyles(
                form.placeholder,
                inlineStyle(() => ({ base: { marginTop: 1 } }))
              )}
              key={`${id}-${key}-separator`}
            >
              {separator}
            </Text>
          ) : null,
        ])}

        {picker && format === 'yyyy-mm-dd' && (
          <Calendar
            selectedDate={valueProps}
            onDateSelected={(e) => {
              console.log(e);
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
