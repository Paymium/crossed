/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { type GetProps, withStaticProperties } from '@crossed/core';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Text, type TextProps } from '../typography/Text';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { forwardRef } from 'react';

const useCard = createStyles((t) => ({
  root: {
    base: {
      padding: t.space.xs,
      borderRadius: t.space.xxs,
      backgroundColor: t.colors.neutral['100'],
    },
    variants: {
      role: {
        link: {
          ':hover': { backgroundColor: t.colors.neutral.low },
          ':active': { backgroundColor: t.colors.neutral.hight },
        },
      },
    },
  },
  title: {
    base: { alignSelf: 'stretch', fontSize: t.font.heading.lg.fontSize },
  },
  description: { base: { alignSelf: 'stretch' } },
}));

type Variants = ExtractForProps<typeof useCard.root>;

type CardProps = YBoxProps & Variants['variants'];

const CardRoot = forwardRef(({ role, ...props }: CardProps, ref: any) => {
  return (
    <YBox
      ref={ref}
      role={role}
      {...props}
      {...useCard.root.rnw({ ...props, variants: { role } })}
    />
  );
});

const Title = (props: TextProps) => {
  return <Text size="md" {...props} {...useCard.title.rnw(props)} />;
};

const Description = (props: TextProps) => {
  return <Text {...props} {...useCard.description.rnw(props)} />;
};
const Card = withStaticProperties(CardRoot, {
  Title,
  Description,
});
const { Title: CardTitle, Description: CardDescription } = Card;

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
