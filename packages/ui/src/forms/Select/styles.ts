/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const useSelect = createStyles(() => ({
  trigger: {
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexShrink: 1,
      display: 'flex',
      flexBasis: 'auto',
      flex: 1,
    },
  },
  select: {
    base: {
      position: 'relative',
      width: 'auto',
    },
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
      justifyContent: 'flex-start',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: 250,
    },
  },
  icon: {
    base: { flexShrink: 0 },
  },
}));
