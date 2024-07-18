/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const baseStyle = createStyles(() => ({
  view: {
    base: {
      borderStyle: 'solid',
      borderWidth: 0,
      alignItems: 'stretch',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      listStyle: 'none',
      margin: 0,
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      zIndex: 0,
    },
  },
}));
