/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

export interface CrossedBasePlugin {
  base?: CrossedstyleValues;
}

export const BasePlugin: Plugin<CrossedBasePlugin> = {
  name: 'BasePlugin',
  test: ['base'],
  apply: ({ addClassname, styles, isWeb, cache }) => {
    /**
     * {".bg-color": { backgroundColor: "black" } }
     */
    const old = cache.get(styles);
    if (old) {
      addClassname(old);
      return;
    }
    const body = Object.keys(styles).reduce<Record<string, CrossedstyleValues>>(
      (acc, key: keyof typeof styles) => {
        const value = styles[key];
        const valueNormalized = normalizeUnitPixel(key, value, isWeb);

        acc[
          `${convertKeyToCss(key)}-[${
            typeof valueNormalized === 'number'
              ? valueNormalized
              : valueNormalized?.replace(/ /g, '-')
          }]`
        ] = {
          [key]: valueNormalized,
        };
        return acc;
      },
      {}
    );
    const result = { body };
    cache.set(styles, result);
    addClassname(result);
  },
};
