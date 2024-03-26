/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { CrossedstyleValues, StyleSheet } from '../types';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../plugins';

export const useStyles = <C extends string>(
  params: () => Record<C, StyleSheet>,
  props: Record<string, any> = {}
) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  return React.useMemo(
    function MemoUseStyles() {
      const stylesMemo: Record<
        C,
        { className: string; style: CrossedstyleValues }
      > = {} as any;
      if (params) {
        (Object.entries(params()) as [C, StyleSheet][]).forEach(
          ([keyStyle, styleOfKey]: [C, StyleSheet]) => {
            Registry.apply(() => styleOfKey, {
              props,
              addClassname: ({ body }) => {
                if (!stylesMemo[keyStyle]) {
                  stylesMemo[keyStyle] = { className: '', style: {} };
                }
                // console.log(body)
                // Object.values(body).reduce((acc, e) => ({ ...acc, ...e }), {});
                stylesMemo[keyStyle].style = {
                  ...stylesMemo[keyStyle].style,
                  ...Object.values(body).reduce(
                    (acc, e) => ({ ...acc, ...e }),
                    {}
                  ),
                };
              },
            });
          }
        );
      }
      // console.log(stylesMemo)
      return stylesMemo;
    },
    [width, props, theme]
  );
};
