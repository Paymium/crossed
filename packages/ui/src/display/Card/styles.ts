/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const cardStyles = createStyles(({ space, radius, colors }) => ({
  root: {
    base: {
      padding: space['2xl'],
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      borderBottomRightRadius: radius.xl,
      borderBottomLeftRadius: radius.xl,
      backgroundColor: colors.background.primary.alt,
      borderWidth: 1,
      borderColor: colors.border.secondary.default,
      flexShrink: 1,
    },
  },
}));
