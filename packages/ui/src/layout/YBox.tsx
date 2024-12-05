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

const useYBox = createStyles(
  () =>
    ({
      root: {
        base: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    }) as const
);

export type YBoxProps = BoxProps;

export const YBox = forwardRef<View, YBoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      alignSelf={'stretch'}
      {...props}
      style={composeStyles(useYBox.root, props.style)}
    />
  );
});
