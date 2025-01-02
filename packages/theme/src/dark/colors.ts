/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Colors } from '../types/color';
import { primary } from '../primary';

export default {
  primary,
  black: 'black',
  white: 'white',
  text: {
    primary: 'white',
    secondary: primary[20],
    brand: primary[40],
    invert: 'black',
  },
  background: {
    primary: primary[100],
    secondary: primary[90],
    brand: primary[40],
    hover: primary[70],
    active: primary[80],
  },
  border: {
    primary: primary[80],
    secondary: primary[70],
    tertiary: primary[70],
    brand: primary[40],
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
