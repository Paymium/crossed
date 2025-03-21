/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const headingTemplateStyles = createStyles(() => ({
  xl: { base: { fontSize: 32, lineHeight: 32, fontWeight: '900' } },
  lg: { base: { fontSize: 24, lineHeight: 32, fontWeight: '800' } },
  md: { base: { fontSize: 18, lineHeight: 24, fontWeight: '700' } },
}));

export const sizeTemplateStyles = createStyles(() => ({
  default: {
    base: { fontSize: 14, lineHeight: 24, fontWeight: '400' },
    media: { md: { fontSize: 16, lineHeight: 24, fontWeight: '400' } },
  },
  md: {
    base: { fontSize: 11, lineHeight: 16, fontWeight: '400' },
    media: { md: { fontSize: 14, lineHeight: 20, fontWeight: '400' } },
  },
  sm: {
    base: { fontSize: 11, lineHeight: 16, fontWeight: '400' },
    media: { md: { fontSize: 12, lineHeight: 16, fontWeight: '400' } },
  },
}));
export const fontSizeStyles = createStyles(() => ({
  xs: { base: { fontSize: 11, lineHeight: 14 } },
  sm: { base: { fontSize: 14, lineHeight: 17 } },
  md: {
    base: {
      fontSize: 16,
      lineHeight: 20,
    },
  },
  lg: { base: { fontSize: 18, lineHeight: 23 } },
  xl: { base: { fontSize: 24, lineHeight: 30 } },
  h6: { base: { fontSize: 28, lineHeight: 36 } },
  h5: { base: { fontSize: 32, lineHeight: 40 } },
  h4: { base: { fontSize: 36, lineHeight: 46 } },
  h3: { base: { fontSize: 40, lineHeight: 50 } },
  h2: { base: { fontSize: 44, lineHeight: 56 } },
  h1: { base: { fontSize: 48, lineHeight: 60 } },
}));

export const fontWeightStyles = createStyles((t) => ({
  xs: {
    base: { fontWeight: t.font.fontWeight.xs },
    media: { md: { fontWeight: t.font.fontWeight.xs } },
  },
  sm: {
    base: { fontWeight: t.font.fontWeight.sm },
    media: { md: { fontWeight: t.font.fontWeight.sm } },
  },
  md: {
    base: { fontWeight: t.font.fontWeight.md },
    media: { md: { fontWeight: t.font.fontWeight.md } },
  },
  lg: {
    base: { fontWeight: t.font.fontWeight.lg },
    media: { md: { fontWeight: t.font.fontWeight.lg } },
  },
  xl: {
    base: { fontWeight: t.font.fontWeight.xl },
    media: { md: { fontWeight: t.font.fontWeight.xl } },
  },
  h6: {
    base: { fontWeight: t.font.fontWeight.h6 },
    media: { md: { fontWeight: t.font.fontWeight.h6 } },
  },
  h5: {
    base: { fontWeight: t.font.fontWeight.h5 },
    media: { md: { fontWeight: t.font.fontWeight.h5 } },
  },
  h4: {
    base: { fontWeight: t.font.fontWeight.h4 },
    media: { md: { fontWeight: t.font.fontWeight.h4 } },
  },
  h3: {
    base: { fontWeight: t.font.fontWeight.h3 },
    media: { md: { fontWeight: t.font.fontWeight.h3 } },
  },
  h2: {
    base: { fontWeight: t.font.fontWeight.h2 },
    media: { md: { fontWeight: t.font.fontWeight.h2 } },
  },
  h1: {
    base: { fontWeight: t.font.fontWeight.h1 },
    media: { md: { fontWeight: t.font.fontWeight.h1 } },
  },
}));

export const fontColorStyles = createStyles((t) => ({
  primary: { base: { color: t.colors.text.primary } },
  secondary: { base: { color: t.colors.text.secondary } },
  default: { base: { color: t.colors.text.primary } },
  info: { base: { color: t.colors.info.primary } },
  warning: { base: { color: t.colors.warning.primary } },
  error: { base: { color: t.colors.error.primary } },
  success: { base: { color: t.colors.success.primary } },
  brand: { base: { color: t.colors.text.brand } },
  invert: { base: { color: t.colors.text.invert } },
}));
