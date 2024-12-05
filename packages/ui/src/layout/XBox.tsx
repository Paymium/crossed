/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';
import { View } from 'react-native';

export const useXBox = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          flexDirection: 'row',
          flexBasis: 'auto',
        },
      },
    }) as const
);

export type XBoxProps = BoxProps;

export const XBox = forwardRef<View, XBoxProps>(({ style, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      justifyContent={'start'}
      {...props}
      style={composeStyles(useXBox.root, style)}
    />
  );
});
