/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const checkboxStyles = createStyles(({ colors, space, radius }) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: space.md,
    },
  },
  hover: {
    base: {
      borderColor: colors.border.primary.default,
    },
  },
  disabled: {
    base: {
      backgroundColor: colors.background.disabled.subtle,
      borderColor: colors.border.disabled.w,
    },
  },
  active: {
    base: {
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: colors.background.brand.solid.default,
    },
  },
  root: {
    base: {
      width: 16,
      height: 16,
      borderRadius: radius.xs,
      borderWidth: 1,
      borderColor: colors.border.primary.w,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  },
  checked: {
    base: {
      borderColor: colors.background.brand.solid.default,
      backgroundColor: colors.background.brand.solid.default,
    },
  },
}));
