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
const Root = withStyle(Pressable, (t) => ({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: t.space.sm,
    borderRadius: t.space.xs,
    borderWidth: 1,
    variants: {
      size: {
        xs: { paddingHorizontal: t.space.xs, height: t.size.xs },
        sm: { paddingHorizontal: t.space.sm, height: t.size.sm },
        default: { paddingHorizontal: t.space.md, height: t.size.md },
        lg: { paddingHorizontal: t.space.lg, height: t.size.lg },
        xl: { paddingHorizontal: t.space.xl, height: t.size.xl },
      } as const,
      color: t.utils.createVariants('backgroundColor', t),
      variant: {
        default: {},
        ghost: {},
        outlined: {},
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: missing type of extraStyle function
    extraStyle: ({ color, variant }, state) => {
      const select = (c: string) => {
        const color = t.utils.select(
          {
            active: t.utils.hexToRgbA(t.utils.shadeColor(c, 25), 0.5),
            hover: t.utils.hexToRgbA(t.utils.shadeColor(c, 5), 0.5),
            base: 'transparent',
          },
          state
        );
        if (variant === 'outlined') {
          return {
            borderColor: c,
            backgroundColor: color,
          };
        } else if (variant === 'ghost') {
          return {
            borderColor: 'transparent',
            backgroundColor: color,
          };
        }
        const colorDefault = t.utils.select(
          {
            active: t.utils.shadeColor(c, -15),
            hover: t.utils.shadeColor(c, 15),
            base: c,
          },
          state
        );
        return {
          borderColor: colorDefault,
          backgroundColor: colorDefault,
        };
      };

      if (color && color !== 'neutral') {
        return select((t.colors as any)[color]);
      }
      return select(t.colors.neutral);
    },
  },
}));
const Text = withDefaultProps(TextUi, { weight: 'semibold' });

const Element = withStyle(View, { base: {} });

const Button = withStaticProperties(
  createButton({
    Group,
    Root,
    Text,
    Element,
  }),
  { styleSheet: Root.styleSheet }
);

const { Text: ButtonText, Element: ButtonElement } = Button;

export { ButtonText, ButtonElement, Button };
export type ButtonProps = GetProps<typeof Button>;
