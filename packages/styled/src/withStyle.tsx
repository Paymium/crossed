/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { createStyle } from './creatStyle';
import { useStyle } from './useStyle';
import type { CreateStyleParams } from './types';

export const withStyle = <
  P extends Record<string, any>,
  S extends CreateStyleParams
>(
  Comp: React.ComponentType<P>,
  styleParams: S,
  options?: { native?: boolean; debug?: boolean }
) => {
  const styleThemed = createStyle(styleParams);
  return React.forwardRef<any, P>(function WithStyled(props, ref) {
    const { theme, ...styleProps } = useStyle(styleThemed, props, options);
    return <Comp ref={ref} {...props} {...styleProps} />;
  });
};
