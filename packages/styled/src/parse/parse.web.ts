/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import hashCode from '../hashCode';
import type { Parse } from './types';
import merge from 'deepmerge';

export const parse: Parse = ({ params, props, media, pseudo }) => {
  let combinedStyle = params || {};
  const { variants, ...other } = combinedStyle;
  if (variants) {
    combinedStyle = Object.keys(variants).reduce((acc, variantName) => {
      const variantValues = variants[variantName];
      const variantValueKeys = Object.keys(variants[variantName]);
      if (variantValueKeys.includes((props as any)[variantName])) {
        acc = merge(acc, variantValues[(props as any)[variantName]]);
      }
      return acc;
    }, other || {});
  }

  const { className } = Object.keys(combinedStyle).reduce<{
    className: string;
  }>(
    (acc, key) => {
      const value = combinedStyle![key];
      if (key === 'base') {
        const p = parse({ params: value, props, media });
        acc.className += p.className;
      } else if (key.startsWith(':')) {
        const p = parse({ params: value, props, media, pseudo: key });
        acc.className += p.className;
      } else {
        if (typeof value === 'object') {
          const p = Object.keys(value).reduce<{
            className: string;
          }>(
            (acc, key2) => {
              const value2 = value[key2];
              acc.className += `c-${hashCode(
                `${key}${pseudo}${key2}${value2}`
              )} `;
              return acc;
            },
            {
              className: '',
            }
          );
          acc.className += p.className;
        } else {
          acc.className += `c-${hashCode(`${media}${pseudo}${key}${value}`)} `;
        }
      }
      return acc;
    },
    { className: '' }
  );

  return {
    className,
    style: className
      ? {
          $$css: true,
          ...className.split(' ').reduce((acc, className) => {
            if (!className) {
              return acc;
            }
            (acc as any)[className] = className;
            return acc;
          }, {}),
        }
      : {},
  };
};
