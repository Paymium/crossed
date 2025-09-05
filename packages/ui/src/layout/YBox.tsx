/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles } from '@crossed/styled';
import { Box, type BoxProps } from './Box';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { flexDirectionStyles } from '../styles';

export type YBoxProps = BoxProps;

export const YBox = forwardRef<View, YBoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
      style={composeStyles(flexDirectionStyles.column, props.style)}
    />
  );
});
