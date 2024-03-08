/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

export interface CrossedMediaQueriesPlugin<K extends string | number | symbol> {
  media?: Partial<Record<K, CrossedstyleValues>>;
}

export const MediaQueriesPlugin = <B extends Record<string, number>>(
  breakpoints: B
): Plugin<CrossedMediaQueriesPlugin<keyof B>> => {
  return {
    test: '^media$',
    apply: ({ styles, addClassname }) => {
      Object.entries(styles).forEach(([key, values]) => {
        const breakpointsValue = normalizeUnitPixel('width', breakpoints[key]);
        if (values) {
          Object.entries(values).forEach(([keyProperty, valueProperty]) => {
            const valueNormalized = normalizeUnitPixel(
              keyProperty,
              valueProperty
            );

            addClassname({
              wrapper: (str) =>
                `@media (min-width: ${breakpointsValue}) { ${str} }`,
              body: {
                [`.${key}:${convertKeyToCss(
                  keyProperty
                )}-[${valueNormalized}]`]: {
                  [keyProperty]: valueNormalized,
                },
              },
            });
          });
        }
      });
    },
  };
};
