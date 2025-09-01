/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ProviderGroup } from './context';
import { BadgeProps } from './type';
import { Badge } from './index';
import { badgeStyle } from './styles';
import { composeStyles } from '@crossed/styled';

export const BadgeGroup = ({
  children,
  variant = 'gray',
  size = 'md',
  rounded,
  pressable,
}: BadgeProps) => {
  return (
    <Badge
      style={composeStyles(badgeStyle.group)}
      variant={variant}
      size={size}
      rounded={rounded}
      pressable={pressable}
    >
      <ProviderGroup variant={variant} size={size} rounded={rounded}>
        {children}
      </ProviderGroup>
    </Badge>
  );
};
