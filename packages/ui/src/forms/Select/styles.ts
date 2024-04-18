/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const useSelect = createStyles((t) => ({
  select: {
    base: {
      position: 'relative',
      width: 'auto',
    },
  },
  options: {
    ':active': { backgroundColor: t.colors.neutral[400] },
  },
  content: {
    base: {
      position: 'absolute',
      maxWidth: 'auto',
      backgroundColor: t.colors.neutral[100],
      // padding: t.space.xs,
      zIndex: 100,
      // backgroundColor: t.colors.neutral,
      // borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      alignItems: 'stretch',
      paddingVertical: t.space.xxs,
      paddingHorizontal: t.space.xxs,
    },
  },
}));
