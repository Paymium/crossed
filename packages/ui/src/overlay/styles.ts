/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const overlayStyles = createStyles(({ colors }) => ({
  root: {
    base: {
      position: 'absolute',
      backgroundColor: colors.black,
      opacity: 0.7,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    web: { base: { position: 'fixed' } },
  },
}));

export const sheetStyles = createStyles(({ colors }) => ({
  content: {
    base: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: colors.background.secondary,
      zIndex: 100000,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: '100%',
    },
    web: { base: { position: 'fixed' as any, boxSizing: 'content-box' } },
  },
}));
export const modalStyles = createStyles(({ colors, space }) => ({
  content: {
    base: {
      zIndex: 100000,
      borderRadius: 16,
      backgroundColor: colors.background.secondary,
      margin: 'auto',
      padding: space.md,
      gap: space.md,
    },
    // web: {
    //   base: {
    //     position: 'fixed',
    //     boxShadow: '0px 8px 24px 0px #0000001A',
    //   },
    // },
  },
}));
export const attachTriggerStyles = createStyles(() => ({
  content: { base: {} },
}));
