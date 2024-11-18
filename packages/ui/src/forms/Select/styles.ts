/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const useSelect = createStyles((t) => ({
  trigger: {
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexShrink: 1,
      display: 'flex',
      flexBasis: 'auto',
      // flex: ,
    },
  },
  select: {
    base: {
      position: 'relative',
      width: 'auto',
    },
  },
  options: {
    // ':active': { backgroundColor: t.colors.neutral[400] },
  },
  value: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexBasis: 'auto',
      width: 'auto',
    },
  },
  content: {
    base: {
      position: 'absolute',
      maxWidth: 'auto',
      // backgroundColor: t.colors.background.secondary,
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      alignItems: 'stretch',
      paddingVertical: t.space.xs,
      paddingHorizontal: t.space.xs,
      gap: t.space.xs,
    },
  },
  icon: {
    base: { flexShrink: 0 },
  },
}));
