/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const rootStyles = createStyles(({ colors }) => ({
  default: {
    base: {
      width: 16,
      height: 16,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: colors.border.primary.w,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: colors.primary.base.transparent,
    },
  },
  hover: {
    base: {
      borderColor: colors.border.primary.default,
    },
  },
  active: {
    base: {
      borderColor: colors.border.primary.default,
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: colors.background.brand.solid.default,
    },
    web: {
      base: {
        // transition: 'all 0.1s ease',
        // boxShadow: `0px 0px 0px 2px ${t.colors.border.secondary}`,
      },
    },
  },
  disabled: {
    base: {
      backgroundColor: colors.background.disabled.subtle,
      borderColor: colors.border.disabled.w,
    },
  },
  checked: {
    base: {
      backgroundColor: colors.background.brand.solid.default,
      borderColor: colors.background.brand.solid.default,
    },
  },
  checkedActive: {
    base: {
      // borderColor: t.colors.primary.primary,
    },
  },
}));

export const pressableStyles = createStyles(({ space }) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: space.md,
    },
  },
}));

export const thumbStyles = createStyles(({ colors }) => ({
  default: {
    base: {
      width: 6,
      height: 6,
      borderRadius: 10,
      backgroundColor: 'transparent',
    },
  },
  checked: {
    base: {
      backgroundColor: colors.primary.base.white,
    },
  },
  checkedActive: {
    base: {
      // backgroundColor: t.colors.primary['1'],
    },
  },
  checkedDisabled: {
    base: {
      backgroundColor: colors.foreground.disabled.subtle,
    },
  },
}));
