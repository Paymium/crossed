/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const menuStyle = createStyles((t) => ({
  item: {
    base: {
      height: 32,
      justifyContent: 'flex-start',
      borderWidth: 0,
      borderRadius: 5,
    },
  },
  itemText: {
    base: { color: t.font.color, fontWeight: '400' },
  },
}));
