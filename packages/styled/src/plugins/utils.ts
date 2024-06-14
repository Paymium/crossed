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
  'borderTopRightRadius',
  'borderTopLeftRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'gap',
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
];

export const normalizeUnitPixel = (key: string, value: any, isWeb?: boolean) =>
  isWeb && convertToPx.includes(key) && typeof value === 'number'
    ? `${value}px`
    : value;

const cache = new Map();
export const convertKeyToCss = (key: string) => {
  const old = cache.get(key);
  if (old) return old;

  const result = key
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
  cache.set(key, result);
  return result;
};
// export const convertKeyToCss = (key: string) => {
//   return key
//     .split(/(?=[A-Z])/)
//     .join('-')
//     .toLowerCase();
// };
