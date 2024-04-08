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
import { createStyles, type ExtractForProps } from '@crossed/styled';
import { forwardRef } from 'react';

const useText = createStyles(
  (t) =>
    ({
      root: {
        base: {
          color: t.colors.default,
          fontFamily: t.fontFamily,
          fontWeight: '400',
          lineHeight: 20,
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
            'xxs': { base: { fontSize: t.fontSize.xxs, lineHeight: 12 } },
            'xs': { base: { fontSize: t.fontSize.xs, lineHeight: 16 } },
            'sm': { base: { fontSize: t.fontSize.sm, lineHeight: 20 } },
            'md': { base: { fontSize: t.fontSize.md, lineHeight: 24 } },
            'lg': { base: { fontSize: t.fontSize.lg, lineHeight: 28 } },
            'xl': { base: { fontSize: t.fontSize.xl, lineHeight: 28 } },
            '2xl': { base: { fontSize: t.fontSize['2xl'], lineHeight: 32 } },
            '3xl': { base: { fontSize: t.fontSize['3xl'], lineHeight: 36 } },
            '4xl': { base: { fontSize: t.fontSize['4xl'], lineHeight: 54 } },
            '5xl': { base: { fontSize: t.fontSize['5xl'], lineHeight: 78 } },
          },
          color: {
            warning: { base: { color: t.colors.warning } },
            info: { base: { color: t.colors.info } },
            link: { base: { color: t.colors.link } },
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

export const Text = forwardRef(
  ({ active, hover, focus, color, size, ...props }: TextProps, ref: any) => {
    return (
      <TextNative
        ref={ref}
        {...props}
        {...useText.root.rnw({
          style: props.style,
          className: props.className,
          active,
          hover,
          focus,
          variants: { color, size },
        })}
      />
    );
  }
);
