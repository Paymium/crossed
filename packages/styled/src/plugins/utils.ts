/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export const convertToPx = [
  'lineHeight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'fontSize',
  'borderWidth',
  'borderBottomWidth',
  'borderTopWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderRadius',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'gap',
  'width',
  'height',
];

export const normalizeUnitPixel = (key: string, value: any, isWeb?: boolean) =>
  isWeb && convertToPx.includes(key) && typeof value === 'number'
    ? `${value}px`
    : value;

export const convertKeyToCss = (key: string) =>
  key
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
