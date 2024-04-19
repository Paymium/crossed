/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const useSelect = createStyles((t) => ({
  trigger: {
    web: { base: { width: 'max-content', flexDirection: 'row' } },
  },
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
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
      alignItems: 'stretch',
      paddingVertical: t.space.xxs,
      paddingHorizontal: t.space.xxs,
      gap: t.space.xxs,
    },
  },
}));
