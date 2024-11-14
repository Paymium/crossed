/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const visibility = createStyles(() => ({
  hidden: {
    base: {},
    web: {
      base: {
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        border: 0,
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
      },
    },
  },
}));
