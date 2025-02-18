/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  capFirstLetter,
  getLocalMonthNames,
  generateYearRange,
} from '../utils';

describe('capFirstLetter', () => {
  test('should capitalize the first letter of a string', () => {
    expect(capFirstLetter('hello')).toBe('Hello');
  });

  test('should return an empty string if input is empty', () => {
    expect(capFirstLetter('')).toBe('');
  });
});

describe('getLocalMonthNames', () => {
  test('should return an array of month names in the correct locale', () => {
    const months = getLocalMonthNames('en-US');
    expect(months).toHaveLength(12);
    expect(months[0]).toBe('January');
  });

  test('should capitalize the first letter of each month', () => {
    const months = getLocalMonthNames('fr-FR');
    expect(
      months.every((month) => month.charAt(0) === month.charAt(0).toUpperCase())
    ).toBe(true);
  });
});

describe('generateYearRange', () => {
  test('should return a range of years from min to max', () => {
    expect(generateYearRange(2000, 2005)).toEqual([
      2000, 2001, 2002, 2003, 2004, 2005,
    ]);
  });

  test('should return a single year if minYear and maxYear are the same', () => {
    expect(generateYearRange(2023, 2023)).toEqual([2023]);
  });

  test('should throw an error if minYear is greater than maxYear', () => {
    expect(() => generateYearRange(2025, 2020)).toThrow(
      "L'année minimale doit être inférieure ou égale à l'année maximale."
    );
  });
});
