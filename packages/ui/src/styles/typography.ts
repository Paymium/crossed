/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const headingTemplateStyles = createStyles(() => ({
  'xs': { base: { fontSize: 24, lineHeight: 32 } },
  'sm': { base: { fontSize: 30, lineHeight: 38 } },
  'md': { base: { fontSize: 36, lineHeight: 44 } },
  'lg': { base: { fontSize: 48, lineHeight: 60, letterSpacing: -0.96 } },
  'xl': { base: { fontSize: 60, lineHeight: 72, letterSpacing: -1.2 } },
  '2xl': { base: { fontSize: 72, lineHeight: 90, letterSpacing: -1.44 } },
}));

export const fontSizeStyles = createStyles(() => ({
  xs: { base: { fontSize: 12, lineHeight: 18 } },
  sm: { base: { fontSize: 14, lineHeight: 20 } },
  md: { base: { fontSize: 16, lineHeight: 24 } },
  lg: { base: { fontSize: 18, lineHeight: 28 } },
  xl: { base: { fontSize: 20, lineHeight: 30 } },
}));

export const fontWeightStyles = createStyles(() => ({
  regular: { base: { fontWeight: 400, fontFamily: 'Inter-Regular' } },
  medium: { base: { fontWeight: 500, fontFamily: 'Inter-Medium' } },
  semibold: { base: { fontWeight: 600, fontFamily: 'Inter-SemiBold' } },
  bold: { base: { fontWeight: 700, fontFamily: 'Inter-Bold' } },
}));

export const fontColorStyles = createStyles(({ colors }) => ({
  primary: { base: { color: colors.text.primary.default } },
  secondary: { base: { color: colors.text.secondary.default } },
  tertiary: { base: { color: colors.text.tertiary.default } },
  quaternary: { base: { color: colors.text.quaternary.default } },
  warning: { base: { color: colors.text.warning.default } },
  error: { base: { color: colors.text.error.default } },
  success: { base: { color: colors.text.success.default } },
  brand: { base: { color: colors.text.brand.primary.default } },
  primaryBrand: { base: { color: colors.text.primary.brand } },
  tertiaryBrand: { base: { color: colors.text.tertiary.brand } },
}));
