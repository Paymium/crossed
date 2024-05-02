/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { primary } from '../primary';
import type { Colors } from '../types/color';

export default {
  black: 'black',
  white: 'white',
  text: {
    primary: 'black',
    secondary: '#5D607C',
    brand: primary.primary,
    invert: 'white',
  },
  background: {
    primary: primary[0],
    secondary: primary[1],
    brand: primary.primary,
    hover: '#ececec',
    active: '#cccccc',
  },
  border: {
    primary: '#C2FCFF',
    secondary: '#AEB6CE',
    tertiary: '#0A1648',
    brand: primary.primary,
  },
  primary,
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
    100: '#797979',
    90: '#a8a8a8',
    80: '#cccccc',
    70: '#ececec',
  },
} as const satisfies Colors;
