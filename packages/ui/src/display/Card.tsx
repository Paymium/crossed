/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  type GetProps,
  withStaticProperties,
  createScope,
} from '@crossed/core';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Text, type TextProps } from '../typography/Text';
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { forwardRef } from 'react';

const useCard = createStyles((t) => ({
  root: {
    base: {
      padding: t.space.xs,
      borderRadius: t.space.xxs,
      backgroundColor: t.colors.background.primary,
    },
    variants: {
      role: {
        link: {
          'base': {
            backgroundColor: t.components.Action.primary.default.background,
          },
          ':hover': {
            backgroundColor: t.components.Action.primary.hover.background,
          },
          ':active': {
            backgroundColor: t.components.Action.primary.active.background,
          },
        },
      },
    },
  },
  title: {
    base: { alignSelf: 'stretch', fontSize: t.font.fontSize.lg },
    variants: {
      role: {
        link: {
          'base': {
            color: t.components.Action.primary.hover.text,
          },
          ':hover': {
            color: t.components.Action.primary.hover.text,
          },
          ':active': {
            color: t.components.Action.primary.active.text,
          },
        },
      },
    },
  },
  description: {
    base: { alignSelf: 'stretch' },
    variants: {
      role: {
        link: {
          'base': {
            color: t.components.Action.primary.hover.text,
          },
          ':hover': {
            color: t.components.Action.primary.hover.text,
          },
          ':active': {
            color: t.components.Action.primary.active.text,
          },
        },
      },
    },
  },
}));

type Variants = ExtractForProps<typeof useCard.root>;

const [Provider, useProvider] = createScope<Variants>({} as Variants);

type CardProps = YBoxProps & Variants['variants'];

const CardRoot = forwardRef(({ role, ...props }: CardProps, ref: any) => {
  return (
    <Provider
      variants={{ role }}
      hover={props.hover}
      active={props.active}
      focus={props.focus}
    >
      <YBox
        ref={ref}
        role={role}
        {...props}
        {...useCard.root.rnw({ ...props, variants: { role } })}
      />
    </Provider>
  );
});

const Title = (props: TextProps) => {
  const values = useProvider();
  return (
    <Text
      size="md"
      {...props}
      {...useCard.title.rnw({ ...values, ...props })}
    />
  );
};

const Description = (props: TextProps) => {
  const values = useProvider();
  return (
    <Text {...props} {...useCard.description.rnw({ ...values, ...props })} />
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
