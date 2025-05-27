/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Shadow } from './types/shadow';

export const shadowLight = {
  'xs': '0px 1px 2px 0px #3747FF0D',
  'sm': '0px 1px 3px 0px #0A0D121A',
  'md': '0px 4px 6px -1px #0A0D121A',
  'lg': '0px 12px 16px -4px #0A0D1214',
  'xl': '0px 20px 24px -4px #0A0D1214',
  '2xl': '0px 24px 48px -12px #0A0D122E',
  '3xl': '0px 32px 64px -12px #0A0D1224',
} as const satisfies Shadow;

export const shadowDark = {
  'xs': '0px 1px 2px 0px #FFFFFF00',
  'sm': '0px 1px 3px 0px #FFFFFF00',
  'md': '0px 4px 6px -1px #FFFFFF00',
  'lg': '0px 12px 16px -4px #FFFFFF00',
  'xl': '0px 20px 24px -4px #FFFFFF00',
  '2xl': '0px 24px 48px -12px #FFFFFF00',
  '3xl': '0px 32px 64px -12px #FFFFFF00',
} as const satisfies Shadow;
