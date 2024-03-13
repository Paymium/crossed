/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { UseStyle } from './types';
import { Platform } from 'react-native';

export const useStyle: UseStyle = (params, props, options) => {
  return React.useMemo(() => {
    const className: string[] = [...(props?.className?.split(' ') || [])];
    if (params) {
      Registry.apply(params, {
        props,
        isWeb: Platform.OS === 'web',
        addClassname: ({ body }) =>
          className.push(...Object.keys(body).map((e) => e.slice(1))),
      });
    }
    const style = className.reduce<Record<string, any>>(
      (acc, cl) => {
        acc[cl] = cl;
        return acc;
      },
      { $$css: true }
    );
    return {
      className: className.join(' '),
      style: [
        style,
        ...(Array.isArray(props?.style) ? props?.style : [props?.style]),
      ],
      theme: Registry.getTheme(),
    };
  }, [params, props, options]);
};
