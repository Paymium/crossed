/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const spacingStyle = createStyles(({ space }) => {
  const xs = { padding: space.sm };
  const sm = { padding: space.md };
  const md = { padding: space.lg };
  const lg = { padding: space.xl };
  return {
    auto: {
      base: sm,
      media: { md, xl: lg },
    },
    xs: { base: xs },
    sm: { base: sm },
    md: { base: md },
    lg: { base: lg },
  };
});

export const cardStyles = createStyles(({ space, font, components }) => ({
  root: {
    base: {
      borderRadius: space.md,
      backgroundColor: components.Card.default.background,
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
      alignSelf: 'stretch',
      lineHeight: font.lineHeight.xl,
    },
  },
  description: {
    base: {
      alignSelf: 'stretch',
      color: components.Card.default.description,
    },
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
