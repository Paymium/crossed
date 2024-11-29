/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Text, TextProps } from '../../typography';
import { composeStyles } from '@crossed/styled';
import { cardStyles } from './styles';

export const Title = (props: TextProps) => {
  return (
    <Text
      size="xl"
      weight="h1"
      {...props}
      style={composeStyles(cardStyles.title, props.style)}
    />
  );
};
Title.displayName = 'Card.Title';
