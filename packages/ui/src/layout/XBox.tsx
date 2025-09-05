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
import { flexDirectionStyles } from '../styles';

export const useXBox = createStyles(() => ({
  root: { base: { flexBasis: 'auto' } },
}));

export type XBoxProps = BoxProps;

export const XBox = forwardRef<View, XBoxProps>(({ style, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      justifyContent={'start'}
      alignItems={'flex-start'}
      {...props}
      style={composeStyles(useXBox.root, flexDirectionStyles.row, style)}
    />
  );
});
