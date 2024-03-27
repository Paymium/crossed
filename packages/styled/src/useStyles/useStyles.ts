/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { CrossedstyleValues, StyleSheet } from '../types';
import { useColorScheme, useWindowDimensions } from 'react-native';

const cache = new Map();

export const useStyles = <C extends string>(
  params: () => Record<C, StyleSheet>,
  props: Record<string, any> = {}
) => {
  const { width } = useWindowDimensions();
  const colorSheme = useColorScheme();
  return React.useMemo(
    function MemoUseStyles() {
      const stylesMemo: Record<
        C,
        { className: string; style: CrossedstyleValues }
      > = {} as any;
      const toto = params();
      (Object.keys(toto)).forEach(
        // keystyle ==== root, styleOfKey === { base: {}, theme: () =>{}}
        (keyStyle: C) => {
          const styleOfKey = toto[keyStyle]
          if (!stylesMemo[keyStyle]) {
            stylesMemo[keyStyle] = { className: '', style: {} };
          }
          Registry.apply(() => styleOfKey, {
            props,
            addClassname: ({ body }) => {
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
      return stylesMemo;
    },
    [width, props, colorSheme]
  );
};
