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

const CardRoot = withStyle(YBox, {
  theme: (t) => ({
    base: {
      padding: t.space.md,
      borderRadius: t.space.xs,
      backgroundColor: t.colors.neutral,
    },
    variants: {
      role: {
        link: {
          ':hover': {
            backgroundColor: t.colors.background,
          },
          ':active': {
            backgroundColor: t.colors.background,
          },
        },
      },
    },
  }),
});

const Title = withStyle(withDefaultProps(Text, { variants: { size: 'lg' } }), {
  base: { alignSelf: 'stretch' },
});

const Description = withStyle(Text, { base: { alignSelf: 'stretch' } });

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
