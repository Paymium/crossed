/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { parse } from './parsse';
import { Registry } from './Registry';
import type { CrossedstyleTheme } from './types';

export function useStyle<
  T extends { className?: string; style?: Record<string, any> }
>(
  params?: () => Record<string, any>,
  props: T = { className: '', style: {} } as T,
  options?: { native?: boolean; debug?: boolean }
): { className: string; style: Record<string, any>; theme: CrossedstyleTheme } {
  return React.useMemo(
    function MemoUseStyle() {
      const { className, style } = parse(params?.() || {});
      // options?.debug &&
      //   props['aria-level'] === 1 &&
      //   console.log(props, className);
      return {
        className: `${props.className ?? ''} ${className}`,
        style: options?.native ? [style, props.style] : props.style,
        theme: Registry.getTheme(),
      };
    },
    [params, props.className, props.style, options]
  );
}
