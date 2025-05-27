/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { PrimitiveSpace } from '../types/space';

export const primitiveSpace = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  80: 320,
  96: 386,
  120: 480,
  140: 560,
  160: 640,
  180: 720,
  192: 768,
  256: 1024,
  320: 1280,
  360: 1440,
  400: 1600,
  480: 1920,
} as const satisfies PrimitiveSpace;
