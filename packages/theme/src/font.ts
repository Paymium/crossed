/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { headLineFontSize } from './typographie/headline';
import { textFontSize } from './typographie/text';
import { fontFamily } from './typographie/family';
import { Font } from './types/font';

export const font = {
  headline: headLineFontSize,
  text: textFontSize,
  family: fontFamily,
} as const satisfies Font;
