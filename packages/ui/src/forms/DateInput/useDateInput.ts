/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled, UseUncontrolledInput } from '@crossed/core';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Context } from './context';
import { getOrderWithFormat, getSeparator } from './utils';
import { Format, Value } from './types';
import { match } from 'ts-pattern';
import { isWeb } from '@crossed/styled';

interface UseDateInputParams
  extends Omit<UseUncontrolledInput<Value>, 'finalValue' | 'value'> {
  locale?: string;
  format?: Format;
  value?: Date;
  placeholder?: { day?: string; month?: string; year?: string };
}

export const useDateInput = ({
  value: valueProps,
  onChange: onChangeProps,
  defaultValue,
  locale = 'en',
  format = 'yyyy-mm-dd',
  placeholder = {},
}: UseDateInputParams) => {
  const order = getOrderWithFormat(locale, format);
  const separator = getSeparator(locale);

  const inputRef = useRef<{ name: string; ref: any }[]>([]);
  useEffect(() => {
    if (isWeb) {
      inputRef.current = [];
      return () => {
        inputRef.current = [];
      };
    }
    return () => {};
  }, [locale]);
  const [value, setValue] = useUncontrolled<Value>({
    value:
      valueProps && valueProps instanceof Date
        ? {
            day: valueProps.getDate(),
            month: valueProps.getMonth() + 1,
            year: valueProps.getFullYear(),
          }
        : undefined,
    defaultValue,
    onChange: onChangeProps,
  });

  const add = useCallback<Context['add']>((name, r) => {
    if (r) {
      const index = inputRef.current.findIndex(({ name: n }) => n === name);
      if (index >= 0) {
        inputRef.current[index] = { ref: r, name };
      } else {
        inputRef.current.push({ ref: r, name });
      }
    }
  }, []);

  const onChange = useCallback<Context['onChange']>(
    (name, v) => {
      if (name === 'dd' && `${v}`.length <= 2) {
        setValue({ ...value, day: Number(v) });
      } else if (name === 'mm' && `${v}`.length <= 2) {
        setValue({ ...value, month: Number(v) });
      } else if (name === 'yyyy' && `${v}`.length <= 4) {
        setValue({ ...value, year: Number(v) });
      }
      const index = inputRef.current.findIndex(({ name: n }) => n === name);
      if (index >= 0 && index < 2) {
        const shouldNext = ['dd', 'mm'].includes(name)
          ? `${v}`.length >= 2
          : `${v}`.length >= 4;
        shouldNext && inputRef.current[index + 1]?.ref.focus();
      }
    },
    [setValue, value]
  );

  const setWithDate = useCallback(
    (date: Date) => {
      if (date)
        setValue({
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        });
    },
    [setValue]
  );
  const inputs = useMemo(() => {
    return order.map((e) => ({
      key: e,
      ref: (ref: any) => add(e, ref),
      onChangeText: (v: string) => onChange(e, v as unknown as number),
      ...match(e)
        .with('dd', (r) => ({
          value: value?.day?.toString(),
          placeholder: placeholder.day ?? r,
          label: value?.day?.toLocaleString(locale, {
            minimumIntegerDigits: 2,
          }),
        }))
        .with('mm', (r) => ({
          value: value?.month?.toString(),
          placeholder: placeholder.month ?? r,
          label: value?.month?.toLocaleString(locale, {
            minimumIntegerDigits: 2,
          }),
        }))
        .with('yyyy', (r) => ({
          placeholder: placeholder.year ?? r,
          value: value?.year?.toString(),
        }))
        .exhaustive(),
    }));
  }, [value, order, add, onChange, placeholder, locale]);

  const containerProps = useMemo(() => {
    return {
      onPress: () => {
        inputRef.current[0]?.ref.focus();
      },
    };
  }, []);

  return {
    containerProps,
    value,
    onChange,
    inputs,
    separator,
    setWithDate,
  };
};
