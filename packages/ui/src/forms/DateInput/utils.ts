/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Format, FormatDay, FormatMonth, FormatYear } from './types';

export function getSeparator(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale);
  const parts = formatter.formatToParts(new Date(2000, 1, 2)); // 2 février 2000
  const { value } = parts.find((part) => {
    if (part.type === 'literal') return true;
    return false;
  });

  return value;
}

export function getFormat(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale);
  const parts = formatter.formatToParts(new Date(2000, 1, 2)); // 2 février 2000

  const format = parts
    .map((part) => {
      if (part.type === 'day') return 'dd';
      if (part.type === 'month') return 'mm';
      if (part.type === 'year') return 'yyyy';
      return '-';
    })
    .join('');

  return format as Format;
}

export function getOrderWithFormat(locale: string, format: Format) {
  const localeFormat = getFormat(locale);
  const formatArray = format.split('-') as (
    | FormatYear
    | FormatMonth
    | FormatDay
  )[];
  const localeFormatArray = localeFormat.split('-') as (
    | FormatYear
    | FormatMonth
    | FormatDay
  )[];
  const result: (FormatYear | FormatMonth | FormatDay)[] = [];
  formatArray.forEach((item) => {
    const index = localeFormatArray.findIndex((e) => item === e);
    if (index === -1) return;
    result[index] = item;
  });
  return result.filter(Boolean);
}
