'use client';

import { Text as TextNative } from 'react-native';
import { styled } from '@crossed/styled';
import type { GetProps } from '@crossed/core';

export const textAlign = {
  auto: { textAlign: 'auto' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
  left: { textAlign: 'left' },
  default: { textAlign: 'left' },
  right: { textAlign: 'right' },
} as const

export const Text = styled(TextNative, (t) => ({
  variants: {
    textAlign,
    weight: {
      thin: { fontWeight: '100' },
      extralight: { fontWeight: '200' },
      light: { fontWeight: '300' },
      default: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
      extrabold: { fontWeight: '800' },
      black: { fontWeight: '900' },
    },
    size: {
      'xxs': { fontSize: t.fontSize.xxs, lineHeight: 12 },
      'xs': { fontSize: t.fontSize.xs, lineHeight: 16 },
      'sm': { fontSize: t.fontSize.sm, lineHeight: 20 },
      'default': { fontSize: t.fontSize.default, lineHeight: 20 },
      'md': { fontSize: t.fontSize.md, lineHeight: 24 },
      'lg': { fontSize: t.fontSize.lg, lineHeight: 28 },
      'xl': { fontSize: t.fontSize.xl, lineHeight: 28 },
      '2xl': { fontSize: t.fontSize['2xl'], lineHeight: 32 },
      '3xl': { fontSize: t.fontSize['3xl'], lineHeight: 36 },
      '4xl': { fontSize: t.fontSize['4xl'], lineHeight: 54 },
      '5xl': { fontSize: t.fontSize['5xl'], lineHeight: 78 },
    },
    color: {
      default: { color: t.colors.textColor },
      error: { color: t.colors.error},
      info: { color: t.colors.info},
      warning: { color: t.colors.warning},
      success: { color: t.colors.success},
    },
  },
}));

export type TextProps = GetProps<typeof Text>;
