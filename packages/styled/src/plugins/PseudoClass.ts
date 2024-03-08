/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

export interface CrossedPseudoClassPlugin {
  ':focus'?: CrossedstyleValues;
  ':hover'?: CrossedstyleValues;
  ':active'?: CrossedstyleValues;
}

export const PseudoClassPlugin: Plugin<CrossedPseudoClassPlugin> = {
  test: '^:(hover|active|focus)$',
  apply: ({ styles, key: ctxKey, addClassname }) => {
    const pseudoClass = ctxKey.replace(/:/i, '');
    Object.entries(styles).forEach(([key, value]) => {
      const valueNormalized = normalizeUnitPixel(key, value);
      addClassname({
        suffix: `:${pseudoClass}`,
        body: {
          [`.${pseudoClass}:${convertKeyToCss(key)}-[${valueNormalized}]`]: {
            [key]: valueNormalized,
          },
        },
      });
    }, {});
  },
};
