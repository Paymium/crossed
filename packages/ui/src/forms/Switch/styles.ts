/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const styles = createStyles(({ colors }) => ({
  track: {
    base: {
      alignItems: 'flex-start',
      width: 48,
      height: 24,
      padding: 3,
      borderRadius: 50,
    },
    web: { base: { transition: 'all 0.3s ease' } },
  },
  toggleOff: { base: { backgroundColor: colors.neutral['70'] } },
  toggleOn: { base: { backgroundColor: colors.background.brand } },
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
