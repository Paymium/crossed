/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Headline } from '../../typography';
import { composeStyles } from '@crossed/styled';
import { cardStyles } from './styles';
import { ComponentProps } from 'react';

export const Title = (props: ComponentProps<typeof Headline>) => {
  return (
    <Headline
      size="lg"
      {...props}
      style={composeStyles(cardStyles.title, props.style)}
    />
  );
};
Title.displayName = 'Card.Title';
