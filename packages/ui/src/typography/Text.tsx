/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { Text as TextNative } from 'react-native';
import { withStyle } from '@crossed/styled';
import { type GetProps } from '@crossed/core';
// import type { Entries } from 'src/theme/types';

export const textAlign = {
  auto: { textAlign: 'auto' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
  left: { textAlign: 'left' },
  default: { textAlign: 'left' },
  right: { textAlign: 'right' },
} as const;

export const Text = withStyle(TextNative, {
  theme: (t) => ({
    base: {
      color: t.colors.default,
      fontFamily: t.fontFamily,
      fontWeight: '400',
      lineHeight: 20,
      // boxSizing: 'border-box',
    },
    variants: {
      weight: {
        thin: { base: { fontWeight: '100' } },
        extralight: { base: { fontWeight: '200' } },
        light: { base: { fontWeight: '300' } },
        medium: { base: { fontWeight: '500' } },
        semibold: { base: { fontWeight: '600' } },
        bold: { base: { fontWeight: '700' } },
        extrabold: { base: { fontWeight: '800' } },
        black: { base: { fontWeight: '900' } },
      },
      size: {
        'xxs': { base: { fontSize: t.fontSize.xxs, lineHeight: 12 } },
        'xs': { base: { fontSize: t.fontSize.xs, lineHeight: 16 } },
        'sm': { base: { fontSize: t.fontSize.sm, lineHeight: 20 } },
        'md': { base: { fontSize: t.fontSize.md, lineHeight: 24 } },
        'lg': { base: { fontSize: t.fontSize.lg, lineHeight: 28 } },
        'xl': { base: { fontSize: t.fontSize.xl, lineHeight: 28 } },
        '2xl': { base: { fontSize: t.fontSize['2xl'], lineHeight: 32 } },
        '3xl': { base: { fontSize: t.fontSize['3xl'], lineHeight: 36 } },
        '4xl': { base: { fontSize: t.fontSize['4xl'], lineHeight: 54 } },
        '5xl': { base: { fontSize: t.fontSize['5xl'], lineHeight: 78 } },
      },
      color: {
        warning: { base: { color: t.colors.warning } },
        info: { base: { color: t.colors.info } },
        link: { base: { color: t.colors.link } },
      },
      textAlign: {
        center: { base: { textAlign: 'center' } },
        left: { base: { textAlign: 'left' } },
        right: { base: { textAlign: 'right' } },
      },
    },
  }),
  variants: {
    size: { xl: {} },
  },
});

export type TextProps = GetProps<typeof Text>;
