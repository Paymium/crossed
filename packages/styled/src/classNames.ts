/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { merge } from 'ts-deepmerge';
import { CrossedStyle } from './types';

export const className = (
  ...classNames: CrossedStyle[]
): { className: string; style: any } => {
  const { className, style } = classNames.flat(Infinity as 10).reduce(
    (acc, e) => {
      if (!e || Array.isArray(e) || typeof e === 'boolean') return acc;
      if (typeof e === 'string' && (e === 'true' || e === 'false')) return acc;

      if (typeof e === 'object') {
        if ('$$css' in e) {
          const { $$css, ...other } = e;
          acc.className.push(other);
        } else acc.style.push(e);
      }

      return acc;
    },
    { className: [], style: [] }
  );

  const result = {
    className: Object.values(merge(...className)).join(' '),
    style: merge(...style),
  };

  return result;
};
