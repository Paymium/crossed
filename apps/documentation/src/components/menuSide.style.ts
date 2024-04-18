/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const menuStyle = createStyles((t) => ({
  item: {
    'base': {
      height: 32,
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderRadius: 5,
    },
    ':hover': { backgroundColor: t.colors.brand.bright },
  },
  itemText: {
    base: { color: t.font.color, fontWeight: '600' },
  },
}));
