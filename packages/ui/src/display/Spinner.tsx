/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, memo, RefAttributes } from 'react';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';
import { useTheme } from '@crossed/styled';

export const Spinner = memo<ActivityIndicatorProps & RefAttributes<View>>(
  forwardRef<View, ActivityIndicatorProps>((props, ref) => {
    const { colors } = useTheme();
    return <ActivityIndicator color={colors.text.brand} {...props} ref={ref} />;
  })
);
