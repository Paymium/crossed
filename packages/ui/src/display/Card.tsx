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
import {
  Children,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';
import { Divider } from '../layout/Divider';

const spacingStyle = createStyles(({ space }) => ({
  basic: {
    base: { padding: space.xs, gap: space.xxs },
    media: {
      md: { padding: space.sm, gap: space.xs },
      xl: { padding: space.md, gap: space.sm },
    },
  },
  composed: {
    media: {
      md: { paddingVertical: space.xs },
      xl: { paddingVertical: space.xs },
    },
  },
}));

const cardStyles = createStyles(({ space, font, components }) => ({
  root: {
    base: {
      borderRadius: space.xxs,
      backgroundColor: components.Action.secondary.default.background,
      borderWidth: 1,
      borderColor: components.Card.default.border,
      flexShrink: 1,
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
      fontSize: font.fontSize.xl,
      fontWeight: font.fontWeight.h1,
      lineHeight: font.lineHeight.xl,
    },
  },
  description: {
    base: { alignSelf: 'stretch', color: components.Card.default.description },
  },
  extra: {
    base: {
      color: components.Card.default.description,
      fontWeight: font.fontWeight.xl,
    },
  },
  first: {
    base: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  middle: {
    base: {
      borderBottomWidth: 0,
      borderRadius: 0,
      borderTopWidth: 0,
      paddingVertical: space.xs,
    },
  },
  last: {
    base: {
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
}));

type CardProps = YBoxProps;

const CardGroup = ({ children }: PropsWithChildren) => {
  const childTmp = Children.toArray(children);
  const size = childTmp.length;

  const mappedChildren = childTmp.reduce<ReactNode[]>((acc, child, index) => {
    if (!isValidElement(child)) return acc;
    if (child.type === Divider) return [...acc, child];
    if (child.type === Card) {
      const isFirst = index === 0;
      const isLast = index === size - 1;
      const isMiddle = !isFirst && !isLast;
      return [
        ...acc,
        cloneElement(child, {
          style: composeStyles(
            child.props.style,
            isFirst && !isLast && cardStyles.first,
            isLast && !isFirst && cardStyles.last,
            isMiddle && cardStyles.middle,
            (isMiddle || isLast) && !isFirst && spacingStyle.composed
          ),
        } as any),
      ];
    }
    throw new Error('Direct children of CardGroup should be Divider or Card');
  }, []);

  return mappedChildren;
};
CardGroup.displayName = 'Card.Group';

const CardRoot = forwardRef(
  ({ role, style, ...props }: CardProps, ref: any) => {
    return (
      <YBox
        ref={ref}
        role={role}
        {...props}
        style={composeStyles(
          cardStyles.root,
          spacingStyle.basic,
          role === 'link' && cardStyles.rootLink,
          style
        )}
      />
    );
  }
);
CardRoot.displayName = 'Card';

const Title = (props: TextProps) => {
  return (
    <Text
      size="lg"
      {...props}
      style={composeStyles(cardStyles.title, props.style)}
    />
  );
};
Title.displayName = 'Card.Title';

const Description = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={composeStyles(cardStyles.description, props.style)}
    />
  );
};
Description.displayName = 'Card.Description';

const Extra = (props: TextProps) => {
  return (
    <Text {...props} style={composeStyles(cardStyles.extra, props.style)} />
  );
};
Extra.displayName = 'Card.Extra';

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

type CardTitleProps = GetProps<typeof CardTitle>;
type CardDescriptionProps = GetProps<typeof CardDescription>;
type CardExtraProps = GetProps<typeof CardExtra>;

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
