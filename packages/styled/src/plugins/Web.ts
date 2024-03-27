/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

export interface CrossedWebPlugin {
  web?: CrossedstyleValues;
}

export const WebPlugin: Plugin<CrossedWebPlugin> = {
  name: 'WebPlugin',
  test: '^web$',
  apply: ({ addClassname, styles, isWeb }) => {
    if (isWeb) {
      addClassname({
        body: Object.entries(styles).reduce<Record<string, CrossedstyleValues>>(
          (acc, [key, value]) => {
            const valueNormalized = normalizeUnitPixel(key, value, isWeb);
            acc[`${convertKeyToCss(key)}-[${valueNormalized}]`] = {
              [key]: valueNormalized,
            };
            return acc;
          },
          {}
        ),
      });
    }
  },
};
