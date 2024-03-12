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
  test: '^base$',
  apply: (context) => {
    /**
     * {".bg-color": { backgroundColor: "black" } }
     */
    context.addClassname({
      body: Object.entries(context.styles).reduce<
        Record<string, CrossedstyleValues>
      >((acc, [key, value]) => {
        const valueNormalized = normalizeUnitPixel(key, value, context.isWeb);
        acc[`.${convertKeyToCss(key)}-[${valueNormalized}]`] = {
          [key]: valueNormalized,
        };
        return acc;
      }, {}),
    });
  },
};
