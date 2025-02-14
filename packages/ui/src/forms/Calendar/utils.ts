/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function getLocalMonthNames(locale: string) {
  const d = new Date(2000, 0); // January
  const months = [];
  for (let i = 0; i < 12; i++) {
    const nameMonth = d.toLocaleString(locale, { month: 'long' });
    months.push(capFirstLetter(nameMonth));
    d.setMonth(i + 1);
  }
  return months;
}
export function generateYearRange(minYear: number, maxYear: number): number[] {
  if (minYear > maxYear) {
    throw new Error(
      "L'année minimale doit être inférieure ou égale à l'année maximale."
    );
  }

  return Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
}
