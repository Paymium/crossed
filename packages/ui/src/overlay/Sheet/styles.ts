/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';

export const styles = createStyles(({ colors, space }) => ({
  box: {
    base: {
      backgroundColor: colors.background.secondary,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
  },
  container: { base: { paddingBottom: space.xl, paddingTop: space.xs } },
  containerPadded: { base: { paddingHorizontal: space.xl } },
  maxHeight: { base: { maxHeight: '100%' } },
  indicator: {
    base: {
      width: 54,
      height: 5,
      backgroundColor: colors.primary[20],
      alignSelf: 'center',
      borderRadius: 14,
    },
  },
}));

export const paddedContainerStyle = (padded: boolean) =>
  composeStyles(padded && styles.containerPadded, padded && styles.container);
