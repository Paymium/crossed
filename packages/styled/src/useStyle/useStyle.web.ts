/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { UseStyle } from './types';
import type { CrossedstyleValues } from '../types';

export const useStyle: UseStyle = (params, props, options) => {
  return React.useMemo(
    function MemoUseStyle() {
      const className: string[] = [...(props?.className?.split(' ') || [])];
      // const { className, style } = parse({ params: params?.(), props });
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
                    // console.log(body);
                    // Object.entries(body).forEach(([e, obj]) => {
                    //   const entires = Object.entries(obj);
                    //   if (entires.length === 1) {
                    //     tmp.set(entires[0][0], e);
                    //   }
                    // });
                    className.push(...Object.keys(body).map((e) => e.slice(1)));
                  },
                });
              }
            });
          }
        );
      }
      // const className = Array.from(tmp.values()).map((e) => e.slice(1));
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
      // const isNative = options?.native ?? true;
      // let styleTmp = isNative
      //   ? [style, props?.style]
      //   : { ...style, ...(props?.style || undefined) };

      // if (Array.isArray(props?.style)) {
      //   if (isNative) {
      //     styleTmp = [style, ...props?.style];
      //   } else {
      //     styleTmp = {
      //       ...style,
      //       ...props?.style.reduce((acc, e) => {
      //         return { ...acc, ...e };
      //       }, {}),
      //     };
      //   }
      // } else {
      //   if (isNative) {
      //     styleTmp = [style, props?.style];
      //   } else {
      //     styleTmp = { ...style, ...(props?.style || undefined) };
      //   }
      // }
      return {
        className: className.join(' '),
        style: styleTmp,
        theme: Registry.getTheme(),
      };
    },
    [params, props, options]
  );
};
