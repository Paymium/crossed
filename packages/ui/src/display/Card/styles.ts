/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const spacingStyle = createStyles(({ space }) => {
  const xs = { padding: space.sm, gap: space.xxs };
  const sm = { padding: space.md, gap: space.xs };
  const md = { padding: space.lg, gap: space.md };
  const lg = { padding: space.xl, gap: space.lg };
  return {
    auto: {
      base: sm,
      media: { md, xl: lg },
    },
    xs: { base: xs },
    sm: { base: sm },
    md: { base: md },
    lg: { base: lg },
    composed: {
      media: {
        md: { paddingVertical: space.md },
        xl: { paddingVertical: space.md },
      },
    },
  };
});

export const cardStyles = createStyles(({ space, font, components }) => ({
  root: {
    base: {
      borderRadius: space.md,
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
      paddingVertical: space.md,
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
