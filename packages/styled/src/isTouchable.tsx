/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { isWeb } from './isWeb';

export const isWindowDefined = typeof window !== 'undefined';
export const isClient = isWeb && isWindowDefined;

export const isWebTouchable =
  isClient && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const isTouchable = !isWeb || isWebTouchable;
