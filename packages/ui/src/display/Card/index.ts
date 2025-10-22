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
import { CardGroup } from './Group';
import { CardFooter } from './Footer';
import { CardHeader } from './Header';

const Card = withStaticProperties(CardRoot, {
  Title,
  Description,
  Group: CardGroup,
  Footer: CardFooter,
  Header: CardHeader,
});
const { Title: CardTitle, Description: CardDescription } = Card;

type CardTitleProps = ComponentProps<typeof CardTitle>;
type CardDescriptionProps = ComponentProps<typeof CardDescription>;
type CardProps = ComponentProps<typeof CardRoot>;

export {
  Card,
  CardTitle,
  CardDescription,
  type CardProps,
  type CardTitleProps,
  type CardDescriptionProps,
};
