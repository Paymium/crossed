/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { type StylableComponent, withStaticProperties } from '@crossed/core';
import { createStyles } from './createStyles';
import { useStyles } from './useStyles';
import type { CreateStyleParams, CrossedPropsExtended } from './types';

export const withStyle = <
  P extends Record<string, any>,
  S extends CreateStyleParams = CreateStyleParams
>(
  Comp: StylableComponent<P>,
  styleParams: S
) => {
  const styleThemed = createStyles({ root: styleParams });
  return withStaticProperties(
    React.forwardRef<any, CrossedPropsExtended<S> & P>((props, ref) => {
      const { root } = useStyles(styleThemed, props as any);
      return <Comp ref={ref} {...props} {...root} />;
    }),
    { styleSheet: styleThemed }
  );
};
