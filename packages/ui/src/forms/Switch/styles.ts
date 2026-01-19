/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const styles = createStyles(({ colors, components: { Switch } }) => ({
  track: {
    base: {
      alignItems: 'flex-start',
      width: 48,
      height: 24,
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 3,
      paddingBottom: 3,
      borderRadius: 50,
    },
    web: { base: { transition: 'all 0.3s ease' } },
  },
  toggleOff: { base: { backgroundColor: Switch.off.background } },
  toggleOn: { base: { backgroundColor: Switch.on.background } },
  thumb: {
    base: {
      height: '100%',
      aspectRatio: 1,
      backgroundColor: colors.background.secondary,
      borderRadius: 50,
    },
  },
  disabledOff: { base: { opacity: 0.5 } },
  disabledOn: { base: { opacity: 0.3 } },
}));
