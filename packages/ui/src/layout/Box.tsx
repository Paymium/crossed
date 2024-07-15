/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View, type ViewProps } from 'react-native';
import {
  createStyles,
  rnw,
  type BaseCrossedPropsExtended,
  type CrossedMethods,
} from '@crossed/styled';
import { forwardRef, memo } from 'react';
import { baseStyle } from '../styles/base';
import { gapStyles } from '../styles/gap';

const styleBox = createStyles(
  () =>
    ({
      root: {
        base: { display: 'flex' },
        web: { base: { boxSizing: 'border-box' } },
      },
      center: {
        base: { alignItems: 'center', justifyContent: 'center' },
      },
    }) as const
);

export type BoxProps = {
  style?: CrossedMethods<any>;
  space?: keyof typeof gapStyles;
  center?: boolean;
} & Omit<BaseCrossedPropsExtended & ViewProps, 'style'>;

export const Box = memo(
  forwardRef<View, BoxProps>(
    (
      { style, className, space, center, active, hover, focus, ...props },
      ref
    ) => (
      <View
        ref={ref}
        {...props}
        {...rnw(
          styleBox.root,
          baseStyle.view,
          center === true && styleBox.center,
          gapStyles[space],
          style
        )}
      />
    )
  )
);
