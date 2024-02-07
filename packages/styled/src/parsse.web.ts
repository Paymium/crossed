/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import hashCode from './hashCode';

export const parse = (
  params: Record<string, any>,
  media?: string,
  pseudo?: string
): { className: string; style: Record<string, any> } => {
  const { className } = Object.keys(params || {}).reduce<{
    className: string;
  }>(
    (acc, key) => {
      const value = params[key];
      if (key === 'base') {
        const p = parse(value);
        acc.className += p.className;
      } else if (key.startsWith(':')) {
        const p = parse(value, media, key);
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
              // acc.style[key2] = key;
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
    {
      className: '',
    }
  );
  return {
    className,
    style: {
      $$css: true,
      ...className.split(' ').reduce((acc, className) => {
        if (!className) {
          return acc;
        }
        (acc as any)[className] = className;
        return acc;
      }, {}),
    },
  };
};
