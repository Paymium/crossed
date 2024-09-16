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
  CrossedMethods,
  withReactive,
} from '@crossed/styled';
import {
  fontWeightStyles,
  fontSizeStyles,
  fontColorStyles,
} from '../styles/typography';
import { textAlignStyles } from '../styles/textAlign';
import { forwardRef } from 'react';

const useText = createStyles((t) => ({
  root: { base: { color: t.font.color, fontFamily: t.font.family } },
}));

export type TextProps = Omit<TextNativeProps, 'style'> & {
  color?: keyof typeof fontColorStyles;
  style?: CrossedMethods<any>;
  weight?: keyof typeof fontWeightStyles;
  size?: keyof typeof fontSizeStyles;
  textAlign?: keyof typeof textAlignStyles;
};

const Text = withReactive(
  forwardRef<TextNative, TextProps>(
    (
      {
        weight = 'md',
        color = 'primary',
        textAlign,
        size = 'md',
        style,
        ...props
      },
      ref
    ) => {
      return (
        <TextNative
          ref={ref}
          {...props}
          {...composeStyles(
            textAlignStyles[textAlign],
            fontSizeStyles[size],
            fontWeightStyles[weight],
            useText.root,
            fontColorStyles[color],
            style
          ).rnw()}
        />
      );
    }
  )
);

Text.displayName = 'CrossedText';

export { Text };
