/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View, type ViewProps } from 'react-native';
import { createStyles, rnw, type CrossedStyle } from '@crossed/styled';
import { forwardRef } from 'react';
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
  style?: CrossedStyle;
  space?: keyof typeof gapStyles;
  center?: boolean;
} & Omit<ViewProps, 'style'>;

export const Box = forwardRef<View, BoxProps>(
  ({ style, space, center, ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        {...rnw(
          baseStyle.view,
          styleBox.root,
          center === true && styleBox.center,
          gapStyles[space],
          ...(Array.isArray(style) ? style : [style])
        )}
      />
    );
  }
);
