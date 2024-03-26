/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { withStyle } from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable } from 'react-native';
import { Text as TextUi } from '../typography/Text';
import {
  GetProps,
  withDefaultProps,
  withStaticProperties,
} from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Box } from '../layout/Box';

const Group = withStyle(XBox, { base: {} });
const Root = withStyle(Pressable, {
  theme: (t) => ({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: t.space.sm,
      borderRadius: t.space.xs,
      borderWidth: 1,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
    variants: {
      size: {
        xs: { base: { paddingHorizontal: t.space.xs, height: t.size.xs } },
        sm: { base: { paddingHorizontal: t.space.sm, height: t.size.sm } },
        md: { base: { paddingHorizontal: t.space.md, height: t.size.md } },
        lg: { base: { paddingHorizontal: t.space.lg, height: t.size.lg } },
        xl: { base: { paddingHorizontal: t.space.xl, height: t.size.xl } },
      } as const,
      // color: t.utils.createVariants('backgroundColor', t),
      variant: {
        default: {
          'base': {
            borderColor: t.colors.neutral,
            backgroundColor: t.colors.neutral,
          },
          ':hover': {
            borderColor: t.colors.neutral,
            backgroundColor: t.colors.neutral,
          },
          ':active': {
            borderColor: t.colors.neutral,
            backgroundColor: t.colors.neutral,
          },
        },
        ghost: {
          'base': {
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          },
          ':hover': {
            backgroundColor: t.colors.neutral,
          },
          ':active': {
            backgroundColor: t.colors.neutral,
          },
        },
        outlined: {
          'base': {
            borderColor: t.colors.neutral,
            backgroundColor: 'transparent',
          },
          ':hover': {
            backgroundColor: t.colors.neutral,
          },
          ':active': {
            backgroundColor: t.colors.neutral,
          },
        },
      },
    },
  }),
});
const Text = withDefaultProps(TextUi, { weight: 'semibold' });

const Element = withStyle(Box, { base: {} });

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
