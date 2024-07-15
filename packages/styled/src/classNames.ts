/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { merge } from 'ts-deepmerge';
import { CrossedStyle } from './types';

const cache = new Map();
export const className = (
  ...classNames: CrossedStyle[]
): { className: string } => {
  const cacheValue = cache.get(classNames);

  if (cacheValue) return cacheValue;
  const result = {
    className: Object.values(
      merge(
        ...classNames
          .flat(Infinity)
          .filter((e) => !!e && typeof e !== 'boolean')
      )
    ).join(' '),
  };
  cache.set(classNames, result);

  return result;
};
