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
  styleParams: S
) => {
  const styleThemed = createStyle(styleParams);
  return React.memo(
    React.forwardRef(function WithStyled(props: P, ref: any) {
      const styleProps = useStyle(styleThemed, props);
      return <Comp ref={ref} {...props} {...styleProps} />;
    })
  );
};
