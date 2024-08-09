/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  Text as TextNative,
  type TextProps as TextNativeProps,
} from 'react-native';
import {
  composeStyles,
  createStyles,
  withReactive,
  type CrossedMethods,
  type ExtractForProps,
} from '@crossed/styled';
import { forwardRef } from 'react';
import { typoStyles, type Size, type Weight } from '../styles/typography';

const useText = createStyles(
  (t) =>
    ({
      root: {
        base: {
          color: t.font.color,
          fontFamily: t.font.family,
        },
        variants: {
          color: {
            error: { base: { color: t.colors.error.primary } },
            warning: { base: { color: t.colors.warning.primary } },
            info: { base: { color: t.colors.info.primary } },
            link: { base: { color: t.colors.primary.primary } },
            success: { base: { color: t.colors.success.primary } },
          },
          textAlign: {
            auto: { base: { textAlign: 'auto' } },
            justify: { base: { textAlign: 'justify' } },
            default: { base: { textAlign: 'left' } },
            center: { base: { textAlign: 'center' } },
            left: { base: { textAlign: 'left' } },
            right: { base: { textAlign: 'right' } },
          },
        },
      },
    }) as const
);

type VariantLocal = ExtractForProps<typeof useText.root>;

export type TextProps = Omit<TextNativeProps, 'style'> &
  VariantLocal['variants'] &
  Omit<VariantLocal, 'variants'> &
  Size['variants'] &
  Weight['variants'] & { style?: CrossedMethods<any, any> };

const Text = withReactive(
  forwardRef(
    (
      {
        active,
        hover,
        focus,
        color,
        weight,
        textAlign,
        size = 'md',
        style,
        ...props
      }: TextProps,
      ref: any
    ) => {
      return (
        <TextNative
          ref={ref}
          {...props}
          {...composeStyles(
            typoStyles.size,
            useText.root,
            typoStyles.weight,
            style
          ).rnw({
            ...props,
            active,
            hover,
            focus,
            variants: { color, size, weight, textAlign },
          })}
        />
      );
    }
  )
);

Text.displayName = 'CrossedText';

export { Text };
