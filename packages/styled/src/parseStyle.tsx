/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

const propertyToTransformInPixel = ['lineHeight'];
export const parseStyle = (style?: any) => {
  return style
    ? Object.entries(style).reduce((acc, [key, v]) => {
        acc[key] = propertyToTransformInPixel.includes(key) ? `${v}px` : v;
        return acc;
      }, style)
    : style;
};
