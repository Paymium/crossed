/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { ComponentProps } from 'react';
import { CardRoot } from './Root';
import { Title } from './Title';
import { Description } from './Description';
import { Extra } from './Extra';
import { CardGroup } from './Group';

const Card = withStaticProperties(CardRoot, {
  Title,
  Description,
  Extra,
  Group: CardGroup,
});
const {
  Title: CardTitle,
  Description: CardDescription,
  Extra: CardExtra,
} = Card;

type CardTitleProps = ComponentProps<typeof CardTitle>;
type CardDescriptionProps = ComponentProps<typeof CardDescription>;
type CardExtraProps = ComponentProps<typeof CardExtra>;
type CardProps = ComponentProps<typeof CardRoot>;

export {
  Card,
  CardTitle,
  CardDescription,
  CardExtra,
  CardGroup,
  type CardProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardExtraProps,
};
