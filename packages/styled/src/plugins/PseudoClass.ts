/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

type CrossedPseudoClassList = 'focus' | 'hover' | 'active';

export interface CrossedPseudoClassProps {
  props: {
    // eslint-disable-next-line no-unused-vars
    [key in CrossedPseudoClassList]?: true | false;
  };
}

export interface CrossedPseudoClassPlugin {
  ':focus'?: CrossedstyleValues;
  ':hover'?: CrossedstyleValues;
  ':active'?: CrossedstyleValues;
}

export const PseudoClassPlugin: Plugin<CrossedPseudoClassPlugin> = {
  test: '^:(hover|active|focus)$',
  apply: ({ styles, key: ctxKey, addClassname, props, isWeb }) => {
    const pseudoClass = ctxKey.replace(/:/i, '');
    Object.entries(styles).forEach(([key, value]) => {
      const valueNormalized = normalizeUnitPixel(key, value, isWeb);
      if ((props && props[pseudoClass]) || !props) {
        addClassname({
          suffix: `:${pseudoClass}`,
          body: {
            [`.${pseudoClass}:${convertKeyToCss(key)}-[${valueNormalized}]`]: {
              [key]: valueNormalized,
            },
          },
        });
      }
    }, {});
  },
};
