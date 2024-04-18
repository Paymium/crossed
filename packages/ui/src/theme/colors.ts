/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Colors } from './types/color';

export const colorsLight: Colors = {
  brand: {
    bright: '#4737FF',
    hight: '#9088F7',
    low: '#EBEAFE',
    muted: '#2606C0',
    satured: '#1E078F',
  },
  error: {
    bright: '#EF4444',
    muted: '#D73636',
    satured: '#A21A1A',
    low: '#FFE6E6',
    hight: '#FEC4C4',
  },
  info: {
    bright: '#93C5FD',
    hight: '#93C5FD',
    low: '#EEF6FF',
    muted: '#93C5FD',
    satured: '#285F9B',
  },
  success: {
    bright: '#3ABB7D',
    hight: '#C9EDDF',
    low: '#EDFFF6',
    muted: '#A4DCBE',
    satured: '#188551',
  },
  warning: {
    bright: '#F97316',
    hight: '#F97316',
    low: '#FFF0E6',
    muted: '#F97316',
    satured: '#AD5C23',
  },
  neutral: {
    bright: '#6F7995',
    hight: '#AEB6CE',
    low: '#DCDBEF',
    muted: '#EBEAF8',
    satured: '#F4F2FC',
    '100': '#FFFFFF',
    '200': '#F4F2FC',
    '300': '#EBEAFE',
    '400': '#DAD9EC',
    '500': '#AEB6CE',
    '600': '#5D607C',
    '700': '#1D1D40',
    '800': '#141430',
    '900': '#000000',
  },
} as const;

export const colorsDark = { ...colorsLight };
