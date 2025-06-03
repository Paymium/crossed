/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { headLineFontSize } from './typographie/headline';
import { textFontSize } from './typographie/text';
import { fontWeight } from './typographie/weight';
import { Font } from './types/font';

export const font = {
  headline: headLineFontSize,
  text: textFontSize,
  weight: fontWeight,
} as const satisfies Font;
