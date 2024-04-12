/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../types';
import { convertKeyToCss, normalizeUnitPixel } from './utils';

export let cacheBreakpoints: Partial<
  Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>
> = {};

export interface CrossedMediaQueriesPlugin {
  media?: {
    xs?: CrossedstyleValues;
    sm?: CrossedstyleValues;
    md?: CrossedstyleValues;
    lg?: CrossedstyleValues;
    xl?: CrossedstyleValues;
  };
}

export const MediaQueriesPlugin = <
  B extends Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>
>(
  breakpoints: B
): Plugin<CrossedMediaQueriesPlugin> => {
  cacheBreakpoints = breakpoints;
  return {
    name: 'MediaQueriesPlugin',
    test: '^media$',
    apply: function MediaQueriesApply({ styles, addClassname, props, isWeb }) {
      let Dimensions: any;
      let Platform: any;
      // props only exists at runtime
      // Hack for load react-native only at runtime, not buildtime
      if (props) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        Dimensions = require('react-native').Dimensions;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        Platform = require('react-native').Platform;
      }
      Object.entries(styles).forEach(
        ([key, values]: [
          keyof CrossedMediaQueriesPlugin['media'],
          CrossedstyleValues
        ]) => {
          const breakpointsValue = normalizeUnitPixel(
            'width',
            breakpoints[key],
            isWeb
          );
          if (values) {
            Object.entries(values).forEach(([keyProperty, valueProperty]) => {
              if (Platform && Dimensions && Platform.OS !== 'web') {
                // apply style for native
                if (breakpoints[key] < Dimensions.get('window').width) {
                  addClassname({
                    body: {
                      [``]: {
                        [keyProperty]: valueProperty,
                      },
                    },
                  });
                }
              } else {
                // apply style for web
                const valueNormalized = normalizeUnitPixel(
                  keyProperty,
                  valueProperty,
                  isWeb
                );
                const body = {
                  [`${key}:${convertKeyToCss(keyProperty)}-[${
                    Number(valueNormalized)
                      ? valueNormalized
                      : valueNormalized.replace(/ /g, '-')
                  }]`]: {
                    [keyProperty]: valueNormalized,
                  },
                };
                addClassname({
                  wrapper: (str) =>
                    `@media (min-width: ${breakpointsValue}) { ${str} }`,
                  body,
                });

                if (props && typeof window !== 'undefined') {
                  if (breakpoints[key] < Dimensions.get('window').width) {
                    addClassname({ body });
                  }
                }
              }
            });
          }
        }
      );
    },
  };
};
