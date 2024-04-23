/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  createStyles,
  type CrossedstyleValues,
  type ExtractForProps,
} from '@crossed/styled';

export const typoStyles = createStyles((t) => {
  const base: CrossedstyleValues = {
    color: t.font.color,
    fontFamily: t.font.family,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  };
  return {
    size: {
      base,
      variants: {
        size: {
          xs: { base: { fontSize: 11, lineHeight: 14 } },
          sm: { base: { fontSize: 14, lineHeight: 17 } },
          md: { base },
          lg: { base: { fontSize: 18, lineHeight: 23, fontWeight: '700' } },
          xl: { base: { fontSize: 24, lineHeight: 30, fontWeight: '700' } },
          h6: { base: { fontSize: 28, lineHeight: 36, fontWeight: '700' } },
          h5: { base: { fontSize: 32, lineHeight: 40, fontWeight: '700' } },
          h4: { base: { fontSize: 36, lineHeight: 46, fontWeight: '700' } },
          h3: { base: { fontSize: 40, lineHeight: 50, fontWeight: '700' } },
          h2: { base: { fontSize: 44, lineHeight: 56, fontWeight: '700' } },
          h1: { base: { fontSize: 48, lineHeight: 60, fontWeight: '700' } },
        },
      },
    },
  };
});

export type Size = ExtractForProps<typeof typoStyles.size>;
