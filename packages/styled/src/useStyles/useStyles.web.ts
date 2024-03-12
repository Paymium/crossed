/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { CrossedstyleValues } from '../types';

export const useStyles = (params: any, props: any, options: any) => {
  return React.useMemo(
    function MemoUseStyle() {
      const className: string[] = [...(props?.className?.split(' ') || [])];
      if (params) {
        Object.entries(params()).forEach(
          ([key, styles]: [string, CrossedstyleValues]) => {
            Registry.getPlugins().forEach(({ test, apply }) => {
              const keyFind = key.match(new RegExp(test, 'g'));
              if (test && keyFind && keyFind.length > 0) {
                apply({
                  props,
                  key,
                  styles,
                  addClassname: ({ body }) => {
                    className.push(...Object.keys(body).map((e) => e.slice(1)));
                  },
                });
              }
            });
          }
        );
      }
      const style = className.reduce<Record<string, any>>(
        (acc, cl) => {
          acc[cl] = cl;
          return acc;
        },
        { $$css: true }
      );
      let styleTmp = Array.isArray(props?.style)
        ? [style, ...props?.style]
        : [style, props?.style];
      return {
        className: className.join(' '),
        style: styleTmp,
        theme: Registry.getTheme(),
      };
    },
    [params, props, options]
  );
};
