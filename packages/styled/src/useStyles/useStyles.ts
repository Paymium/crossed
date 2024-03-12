/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { CrossedstyleValues, StyleSheet } from '../types';
// import { useWindowDimensions } from 'react-native';

export const useStyles = <C extends string>(
  params: () => Record<C, StyleSheet>
) => {
  // const { width } = useWindowDimensions();
  const stylesToReturn = React.useMemo(
    function MemoUseStyles() {
      const stylesMemo: Record<
        C,
        { className: string; style: CrossedstyleValues }
      > = {} as any;
      if (params) {
        (Object.entries(params()) as [C, StyleSheet][]).forEach(
          ([keyStyle, styleOfKey]: [C, StyleSheet]) => {
            Object.entries(styleOfKey).forEach(
              ([key, styles]: [string, CrossedstyleValues]) => {
                Registry.getPlugins().forEach(({ test, apply }) => {
                  const keyFind = key.match(new RegExp(test, 'g'));
                  if (test && keyFind && keyFind.length > 0) {
                    apply({
                      // props: {
                      //   ...props,
                      //   active: props.active ?? active,
                      //   hover: props.hover ?? hover,
                      // },
                      key,
                      styles,
                      addClassname: ({ body }) => {
                        if (!stylesMemo[keyStyle]) {
                          stylesMemo[keyStyle] = { className: '', style: {} };
                        }
                        Object.values(body).reduce(
                          (acc, e) => ({ ...acc, ...e }),
                          {}
                        );
                        stylesMemo[keyStyle] = {
                          className: '',
                          style: {
                            ...stylesMemo[keyStyle].style,
                            ...Object.values(body).reduce(
                              (acc, e) => ({ ...acc, ...e }),
                              {}
                            ),
                          },
                        };
                      },
                    });
                  }
                });
              }
            );
          }
        );
      }
      return stylesMemo;
    },
    [params]
  );
  return {
    styles: stylesToReturn,
    theme: Registry.getTheme(),
  };
};
