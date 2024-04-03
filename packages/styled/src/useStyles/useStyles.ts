/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type {
  CreateStylesParams,
  CrossedPropsExtended,
  CrossedstyleValues,
  StyleSheet,
} from '../types';
import { useColorScheme, useWindowDimensions } from 'react-native';

export const useStyles = <K extends string, S>(
  params: CreateStylesParams<K, S>,
  props: CrossedPropsExtended<S>
) => {
  const { width } = useWindowDimensions();
  const colorSheme = useColorScheme();
  return React.useMemo(
    function MemoUseStyles() {
      const stylesMemo: Record<
        K,
        { className: string; style: CrossedstyleValues }
      > = {} as any;
      if (params) {
        (
          Object.entries(params(Registry.getTheme())) as [K, StyleSheet][]
        ).forEach(([keyStyle, styleOfKey]: [K, StyleSheet]) => {
          Registry.apply(() => styleOfKey, {
            props,
            addClassname: ({ body }) => {
              if (!stylesMemo[keyStyle]) {
                stylesMemo[keyStyle] = { className: '', style: {} };
              }
              stylesMemo[keyStyle].style = {
                ...stylesMemo[keyStyle].style,
                ...Object.values(body).reduce(
                  (acc, e) => ({ ...acc, ...e }),
                  {}
                ),
              };
            },
          });
        });
      }
      return stylesMemo;
    },
    [width, props, colorSheme]
  );
};
