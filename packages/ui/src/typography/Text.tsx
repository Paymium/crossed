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
  createStyles,
  withReactive,
  type ExtractForProps,
} from '@crossed/styled';
import { forwardRef } from 'react';

const useText = createStyles(
  (t) =>
    ({
      root: {
        base: {
          ...t.font.text.md,
          color: t.font.color,
          fontFamily: t.font.family,
        },
        variants: {
          weight: {
            thin: { base: { fontWeight: '100' } },
            extralight: { base: { fontWeight: '200' } },
            light: { base: { fontWeight: '300' } },
            medium: { base: { fontWeight: '500' } },
            semibold: { base: { fontWeight: '600' } },
            bold: { base: { fontWeight: '700' } },
            extrabold: { base: { fontWeight: '800' } },
            black: { base: { fontWeight: '900' } },
          },
          size: {
            'sm': { base: t.font.text.sm },
            'md': { base: t.font.text.md },
          },
          color: {
            warning: { base: { color: t.colors.warning.satured } },
            info: { base: { color: t.colors.info.satured } },
            link: { base: { color: t.colors.brand.bright } },
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
    } as const)
);

type VariantLocal = ExtractForProps<typeof useText.root>;

export type TextProps = TextNativeProps &
  VariantLocal['variants'] &
  Omit<VariantLocal, 'variants'>;

export const Text = withReactive(
  forwardRef(
    ({ active, hover, focus, color, size, ...props }: TextProps, ref: any) => {
      return (
        <TextNative
          ref={ref}
          {...props}
          style={[
            useText.root.rnw({
              style: props.style,
              className: props.className,
              active,
              hover,
              focus,
              variants: { color, size },
            }).style,
            props.style,
          ]}
        />
      );
    }
  )
);
