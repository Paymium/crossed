/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { parse } from '../parse';
import { Registry } from '../Registry';
import type { UseStyle } from './types';

export const useStyle: UseStyle = (params, props, options) => {
  return React.useMemo(
    function MemoUseStyle() {
      const { className, style } = parse({ params: params?.(), props });
      const isNative = options?.native ?? true;
      let styleTmp = isNative
        ? [style, props?.style]
        : { ...style, ...(props?.style || undefined) };

      if (Array.isArray(props?.style)) {
        if (isNative) {
          styleTmp = [style, ...props?.style];
        } else {
          styleTmp = {
            ...style,
            ...props?.style.reduce((acc, e) => {
              return { ...acc, ...e };
            }, {}),
          };
        }
      } else {
        if (isNative) {
          styleTmp = [style, props?.style];
        } else {
          styleTmp = { ...style, ...(props?.style || undefined) };
        }
      }
      return {
        className: `${props?.className ?? ''} ${className}`,
        style: styleTmp,
        theme: Registry.getTheme(),
      };
    },
    [params, props?.className, props?.style, options]
  );
};
