/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { StylableComponent, withStaticProperties } from '@crossed/core';
import { createStyle } from './creatStyle';
import { useStyle } from './useStyle';
import type { CreateStyleParams, CrossedPropsExtended } from './types';

export const withStyle = <
  P extends Record<string, any>,
  S extends CreateStyleParams = CreateStyleParams
>(
  Comp: StylableComponent<P>,
  styleParams: S,
  options?: { native?: boolean; debug?: boolean }
) => {
  const styleThemed = createStyle(styleParams);
  return withStaticProperties(
    React.forwardRef<
      any,
      CrossedPropsExtended<
        S extends (_params: any) => infer SF ? SF : S
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore props is define by user
      >['props'] &
        P
    >(function WithStyled(props, ref) {
      const { theme, ...styleProps } = useStyle(
        styleThemed,
        props as any,
        options
      );
      return <Comp ref={ref} {...props} {...styleProps} />;
    }),
    { styleSheet: styleThemed }
  );
};
