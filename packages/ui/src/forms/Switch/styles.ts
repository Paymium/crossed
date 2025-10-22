/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const trackSizeStyles = createStyles(() => ({
  sm: { base: { width: 36, height: 20 } },
  md: { base: { width: 44, height: 24 } },
}));

export const styles = createStyles(({ colors }) => ({
  track: {
    'base': {
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      padding: 3,
      borderRadius: 50,
    },
    ':active': {
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: colors.background.brand.solid.default,
    },
    'web': { base: { transition: 'background 0.3s ease' } },
  },
  toggleOff: {
    'base': { backgroundColor: colors.background.brand.secondary.default },
    ':hover': { backgroundColor: colors.background.brand.secondary.hover },
    ':active': { backgroundColor: colors.background.brand.secondary.hover },
  },
  toggleOn: {
    'base': { backgroundColor: colors.background.brand.solid.default },
    ':hover': { backgroundColor: colors.background.brand.solid.hover },
    ':active': { backgroundColor: colors.background.brand.solid.hover },
  },
  thumb: {
    base: {
      height: '100%',
      aspectRatio: 1,
      backgroundColor: colors.primary.base.white,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  },
  disabledOff: { base: { opacity: 0.5 } },
  disabledOn: { base: { opacity: 0.3 } },
}));
