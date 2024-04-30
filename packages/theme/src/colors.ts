/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Colors } from './types/color';

const primary = {
  10: '#ffffff',
  20: '#E4ECFF',
  30: '#A6C4FE',
  40: '#579EFD',
  50: '#0e64b1',
  60: '#08569B',
  70: '#033563',
  80: '#01203F',
  90: '#011730',
  100: '#000000',
  primary: '#0f79d7',
} as const;

export const colorsLight = {
  black: 'black',
  white: 'white',
  text: {
    primary: 'white',
    secondary: '#5D607C',
    brand: primary.primary,
    invert: 'white',
  },
  background: {
    primary: primary[10],
    secondary: primary[20],
    brand: primary.primary,
  },
  border: {
    primary: '#C2FCFF',
    secondary: '#AEB6CE',
    tertiary: '#0A1648',
    brand: primary.primary,
  },
  primary: {
    ...primary,
    0: primary[20],
    1: primary[10],
  },
  error: {
    primary: '#EF4444',
    muted: '#D73636',
    satured: '#A21A1A',
    low: '#FFE6E6',
    hight: '#FEC4C4',
  },
  info: {
    dark: '#285F9B',
    light: '#EEF6FF',
    primary: '#93C5FD',
  },
  success: {
    dark: '#188551',
    light: '#EDFFF6',
    primary: '#3ABB7D',
  },
  warning: {
    dark: '#AD5C23',
    light: '#FFF0E6',
    primary: '#F97316',
  },
  neutral: {
    100: '#141430',
    90: '#1D1D4C',
    80: '#5D607C',
    70: '#AEB6CE',
  },
} as const satisfies Colors;

export const colorsDark = {
  black: 'black',
  white: 'white',
  text: {
    primary: 'white',
    secondary: '#AEB6CE',
    brand: '#0F82E6',
    invert: 'black',
  },
  background: {
    primary: primary[80],
    secondary: primary[90],
    brand: primary.primary,
  },
  border: {
    primary: '#000000',
    secondary: '#060923',
    tertiary: '#0A1648',
    brand: '#0F82E6',
  },
  primary: {
    ...primary,
    0: primary[100],
    1: primary[90],
  },
  error: {
    primary: '#EF4444',
    muted: '#D73636',
    satured: '#A21A1A',
    low: '#FFE6E6',
    hight: '#FEC4C4',
  },
  info: {
    dark: '#285F9B',
    light: '#EEF6FF',
    primary: '#93C5FD',
  },
  success: {
    dark: '#188551',
    light: '#EDFFF6',
    primary: '#3ABB7D',
  },
  warning: {
    dark: '#AD5C23',
    light: '#FFF0E6',
    primary: '#F97316',
  },
  neutral: {
    100: '#141430',
    90: '#1D1D4C',
    80: '#5D607C',
    70: '#AEB6CE',
  },
} as const satisfies Colors;
