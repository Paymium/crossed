/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { type GetProps, withStaticProperties } from '@crossed/core';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Text, type TextProps } from '../typography/Text';
import { composeStyles, createStyles } from '@crossed/styled';
import { forwardRef } from 'react';

const useCard = createStyles(({ space, font, components }) => ({
  root: {
    base: {
      padding: space.xs,
      borderRadius: space.xxs,
      backgroundColor: components.Action.secondary.default.background,
      borderWidth: 1,
      borderColor: components.Card.default.border,
      gap: space.xxs,
    },
  },
  rootLink: {
    'web': { base: { transition: 'all 0.27s ease' } },
    ':hover': {
      backgroundColor: components.Card.hover.background,
    },
    ':active': {
      backgroundColor: components.Card.active.background,
    },
  },
  title: {
    base: {
      color: components.Card.default.title,
      alignSelf: 'stretch',
      fontSize: font.fontSize.lg,
    },
  },
  description: {
    base: { alignSelf: 'stretch', color: components.Card.default.description },
  },
}));

type CardProps = YBoxProps;

const CardRoot = forwardRef(
  ({ role, style, ...props }: CardProps, ref: any) => {
    return (
      <YBox
        ref={ref}
        role={role}
        {...props}
        style={composeStyles(
          useCard.root,
          role === 'link' && useCard.rootLink,
          style
        )}
      />
    );
  }
);

const Title = (props: TextProps) => {
  // const values = useProvider();
  return (
    <Text
      size="lg"
      {...props}
      style={composeStyles(useCard.title, props.style)}
    />
  );
};

const Description = (props: TextProps) => {
  // const values = useProvider();
  return (
    <Text {...props} style={composeStyles(useCard.description, props.style)} />
  );
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
