/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps } from 'react';
import { Text } from '../../typography';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const MenuLabel = ({ style, ...props }: ComponentProps<typeof Text>) => (
  <Text
    {...props}
    style={composeStyles(
      inlineStyle(() => ({ base: { marginTop: 0 } })),
      style
    )}
  />
);
MenuLabel.displayName = 'MenuList.Label';
