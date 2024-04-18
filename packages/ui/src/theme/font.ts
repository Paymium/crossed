/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Font } from './types/font';

export const font: Font = {
  heading: {
    md: { fontSize: 18, fontWeight: '700', lineHeight: 24 },
    lg: { fontSize: 24, fontWeight: '800', lineHeight: 32 },
    xl: { fontSize: 32, fontWeight: '900', lineHeight: 32 },
  },
  text: {
    sm: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    md: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  },
  color: 'black',
  family: 'Arial',
};
