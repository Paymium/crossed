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
  'top',
  'bottom',
  'left',
  'right',
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

export const convertGeneralKeyToSpecificKey = (style: Record<string, any>) => {
  return Object.keys(style).reduce<Record<string, any>>((acc, key) => {
    const value = style[key];
    if (key === 'marginHorizontal') {
      acc.marginLeft = value;
      acc.marginRight = value;
    } else if (key === 'marginVertical') {
      acc.marginTop = value;
      acc.marginBottom = value;
    } else if (key === 'paddingHorizontal') {
      acc.paddingLeft = value;
      acc.paddingRight = value;
    } else if (key === 'paddingVertical') {
      acc.paddingTop = value;
      acc.paddingBottom = value;
    } else if (key === 'padding') {
      acc.paddingTop = value;
      acc.paddingBottom = value;
      acc.paddingLeft = value;
      acc.paddingRight = value;
    } else if (key === 'margin') {
      acc.marginTop = value;
      acc.marginBottom = value;
      acc.marginLeft = value;
      acc.marginRight = value;
    } else if (key === 'borderRadius') {
      acc.borderTopLeftRadius = value;
      acc.borderTopRightRadius = value;
      acc.borderBottomLeftRadius = value;
      acc.borderBottomRightRadius = value;
    } else if (key === 'borderWidth') {
      acc.borderTopWidth = value;
      acc.borderLeftWidth = value;
      acc.borderRightWidth = value;
      acc.borderBottomWidth = value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};
export const styleToString = (style: Record<string, any>) => {
  return Object.keys(style).reduce((acc, key) => {
    const value = style[key];
    return `${acc}${convertKeyToCss(key)}:${value};`;
  }, '');
};
