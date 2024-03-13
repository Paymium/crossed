/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { withStyle } from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable, View } from 'react-native';
import { Text as TextUi } from '../typography/Text';
import {
  GetProps,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';

const Group = withStyle(View, () => ({ base: {} }));
const Root = withStyle(Pressable, ({ theme: t }) => ({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: t.space.sm,
    borderRadius: t.space.xs,
    borderWidth: 1,
  },
  variants: {
    size: {
      xs: { base: { paddingHorizontal: t.space.xs, height: t.size.xs } },
      sm: { base: { paddingHorizontal: t.space.sm, height: t.size.sm } },
      md: { base: { paddingHorizontal: t.space.md, height: t.size.md } },
      lg: { base: { paddingHorizontal: t.space.lg, height: t.size.lg } },
      xl: { base: { paddingHorizontal: t.space.xl, height: t.size.xl } },
    } as const,
    color: t.utils.createVariants('backgroundColor', t),
    variant: {
      default: {
        'base': {
          borderColor: t.colors.neutral,
          backgroundColor: t.colors.neutral,
        },
        ':hover': {
          borderColor: t.utils.shadeColor(t.colors.neutral, 15),
          backgroundColor: t.utils.shadeColor(t.colors.neutral, 15),
        },
        ':active': {
          borderColor: t.utils.shadeColor(t.colors.neutral, -15),
          backgroundColor: t.utils.shadeColor(t.colors.neutral, -15),
        },
      },
      ghost: {
        'base': {
          borderColor: 'transparent',
          backgroundColor: 'transparent',
        },
        ':hover': {
          backgroundColor: t.utils.shadeColor(t.colors.neutral, 25),
        },
        ':active': {
          backgroundColor: t.utils.shadeColor(t.colors.neutral, 5),
        },
      },
      outlined: {
        'base': {
          borderColor: t.colors.neutral,
          backgroundColor: 'transparent',
        },
        ':hover': {
          backgroundColor: t.utils.shadeColor(t.colors.neutral, 5),
        },
        ':active': {
          backgroundColor: t.utils.shadeColor(t.colors.neutral, 25),
        },
      },
    },
  },
}));
const Text = withDefaultProps(TextUi, { weight: 'semibold' });

const Element = withStyle(View, { base: {} });

const Button = withStaticProperties(
  createButton({
    Group,
    Root: withDefaultProps(Root, { size: 'md', variant: 'default' }),
    Text,
    Element,
  }),
  { styleSheet: Root.styleSheet }
);

const { Text: ButtonText, Element: ButtonElement } = Button;

export { ButtonText, ButtonElement, Button };
export type ButtonProps = GetProps<typeof Button>;
