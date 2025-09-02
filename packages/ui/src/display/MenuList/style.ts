/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const rootStyle = createStyles(({ radius, colors }) => ({
  default: {
    base: {
      alignItems: 'stretch',
      backgroundColor: colors.background.primary.alt,
    },
  },
  rounded: {
    base: {
      borderTopLeftRadius: radius.md,
      borderTopRightRadius: radius.md,
      borderBottomLeftRadius: radius.md,
      borderBottomRightRadius: radius.md,
    },
  },
  border: {
    base: {
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border.secondary.alt,
    },
  },
}));
export const itemStyles = createStyles(({ space, radius, colors }) => ({
  rounded: {
    base: {
      borderTopLeftRadius: radius.sm,
      borderTopRightRadius: radius.sm,
      borderBottomLeftRadius: radius.sm,
      borderBottomRightRadius: radius.sm,
    },
  },
  item: {
    'base': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: space.md,
      paddingBottom: space.md,
      paddingLeft: space.xl,
      paddingRight: space.xl,
      justifyContent: 'center',
      borderWidth: 0,
      gap: space.md,
    },
    ':hover': {
      backgroundColor: colors.background.primary.hover,
    },
    ':active': {
      // backgroundColor: t.colors.background.active,
    },
    'web': {
      base: { transition: 'all 170ms ease' },
      ':focus-visible': {
        // outlineColor: t.colors.border.brand,
      },
    },
  },
}));
