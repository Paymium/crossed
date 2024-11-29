/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, TextProps } from '../../typography';
import { composeStyles } from '@crossed/styled';
import { cardStyles } from './styles';

export const Extra = (props: TextProps) => {
  return (
    <Text {...props} style={composeStyles(cardStyles.extra, props.style)} />
  );
};
Extra.displayName = 'Card.Extra';
