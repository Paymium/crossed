/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, memo } from 'react';
import { Text } from '../../typography';
import { composeStyles, useTheme } from '@crossed/styled';
import { useContext } from './context';
import { badgeTextColor } from './styles';

export const BadgeText = memo<ComponentProps<typeof Text>>(
  ({ style, ...props }) => {
    const { variant, size } = useContext();

    return (
      <Text
        style={composeStyles(badgeTextColor[variant], style)}
        fontSize={size === 'sm' ? 'xs' : 'sm'}
        fontWeight={'medium'}
        {...props}
      />
    );
  }
);
