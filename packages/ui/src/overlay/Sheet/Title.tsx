/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, TextProps } from '../../typography/Text';
import { composeStyles, inlineStyle } from '@crossed/styled';

export const SheetTitle = ({ style, ...props }: TextProps) => (
  <Text
    size="xl"
    weight="xl"
    {...props}
    style={composeStyles(inlineStyle(() => ({ base: { flex: 1 } })))}
  />
);
SheetTitle.displayName = 'Sheet.Title';
