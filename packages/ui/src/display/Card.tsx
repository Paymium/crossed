/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  type GetProps,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';
import { withStyle } from '@crossed/styled';
import { YBox } from '../layout/YBox';
import { Text } from '../typography/Text';

const CardRoot = withStyle(
  YBox,
  ({ theme: t }) => ({
    base: {
      padding: t.space.md,
      borderRadius: t.space.xs,
      backgroundColor: t.utils.shadeColor(t.colors.background, 25),
    },
    variants: {
      role: {
        link: {
          ':hover': {
            backgroundColor: t.utils.shadeColor(t.colors.background, 30),
          },
          ':active': {
            backgroundColor: t.utils.shadeColor(t.colors.background, 20),
          },
        },
      },
    },
  }),
  { native: true }
);

const Title = withStyle(
  withDefaultProps(Text, { size: 'lg' }),
  { base: { alignSelf: 'stretch' } },
  { native: true }
);

const Description = withStyle(
  Text,
  { base: { alignSelf: 'stretch' } },
  { native: true }
);

const Card = withStaticProperties(CardRoot, {
  Title,
  Description,
});
const { Title: CardTitle, Description: CardDescription } = Card;

type CardProps = GetProps<typeof Card>;
type CardTitleProps = GetProps<typeof CardTitle>;
type CardDescriptionProps = GetProps<typeof CardDescription>;

export {
  Card,
  CardTitle,
  CardDescription,
  type CardProps,
  type CardTitleProps,
  type CardDescriptionProps,
};
