/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../../types';
import { convertKeyToCss, normalizeUnitPixel } from './../utils';

export interface CrossedPseudoClassProps {
  'focus'?: true | false;
  'hover'?: true | false;
  'focus-visible'?: true | false;
  'disabled'?: true | false;
}

export interface CrossedPseudoClassPlugin {
  ':focus'?: CrossedstyleValues;
  ':hover'?: CrossedstyleValues;
  ':active'?: CrossedstyleValues;
  ':focus-visible'?: CrossedstyleValues;
  ':disabled'?: CrossedstyleValues;
}

export const PseudoClassPlugin: Plugin<CrossedPseudoClassPlugin> = {
  name: 'PseudoClassPlugin',
  test: [':hover', ':active', ':focus', ':focus-visible', ':disabled'],
  apply: ({ styles, key: ctxKey, addClassname, props, isWeb }) => {
    const pseudoClass = ctxKey.replace(/:/i, '');
    Object.entries(styles).forEach(([key, value]) => {
      const valueNormalized = normalizeUnitPixel(key, value, isWeb);
      if (isWeb) {
        addClassname({
          suffix: `:${pseudoClass}`,
          body: {
            [`${pseudoClass}:${convertKeyToCss(key)}-[${
              typeof valueNormalized === 'number'
                ? valueNormalized
                : valueNormalized?.replace(/ /g, '-')
            }]`]: {
              [key]: valueNormalized,
            },
          },
        });
      }
      if (props?.[pseudoClass] || !props) {
        addClassname({
          body: {
            [`${convertKeyToCss(key)}-[${
              typeof valueNormalized === 'number'
                ? valueNormalized
                : valueNormalized?.replace(/ /g, '-')
            }]`]: {
              [key]: valueNormalized,
            },
          },
        });
      }
    }, {});
  },
};
