/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, memo, RefAttributes } from 'react';
import { Box, BoxProps } from '../../layout';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { styles } from './styles';
import { View } from 'react-native';

type SheetPaddedProps = BoxProps & { fullHeight?: boolean };
export const SheetPadded = memo<SheetPaddedProps & RefAttributes<View>>(
  forwardRef(({ fullHeight, ...props }, ref) => {
    return (
      <Box
        {...props}
        ref={ref}
        style={composeStyles(
          styles.containerPadded,
          fullHeight && inlineStyle(() => ({ base: { height: '100%' } })),
          props.style
        )}
      />
    );
  })
);
