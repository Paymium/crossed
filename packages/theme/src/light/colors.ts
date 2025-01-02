/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { primary } from '../primary';
import type { Colors } from '../types/color';

const neutral = {
  100: '#141430',
  90: '#1D1D4C',
  80: '#5D607C',
  70: '#AEB6CE',
} as const;

export default {
  primary,
  neutral,
  black: 'black',
  white: 'white',
  text: {
    primary: 'black',
    secondary: neutral[80],
    brand: primary.primary,
    invert: 'white',
  },
  background: {
    primary: primary[0],
    secondary: 'white',
    brand: primary.primary,
    hover: primary[1],
    active: primary[10],
  },
  border: {
    primary: primary[1],
    secondary: neutral[70],
    tertiary: primary[70],
    brand: primary.primary,
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
} as const satisfies Colors;
