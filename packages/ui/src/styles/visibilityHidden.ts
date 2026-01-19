/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const visibility = createStyles(() => ({
  hidden: {
    base: {
      height: 0,
      width: 0,
      flex: 0,
      maxWidth: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
      border: 0,
      overflow: 'hidden',
      position: 'absolute',
      top: -1000000000,
    },
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
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        margin: '-1px',
      },
    },
  },
}));
