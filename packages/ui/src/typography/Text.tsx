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
  rnw,
  withReactive,
  type CrossedStyle,
} from '@crossed/styled';
import { fontWeightStyles, fontSizeStyles } from '../styles/typography';
import { textAlignStyles } from '../styles/textAlign';

const useText = createStyles((t) => ({
  root: { base: { color: t.font.color, fontFamily: t.font.family } },
}));

export type TextProps = Omit<TextNativeProps, 'style'> & {
  style?: CrossedStyle;
  weight?: keyof typeof fontWeightStyles;
  size?: keyof typeof fontSizeStyles;
  textAlign?: keyof typeof textAlignStyles;
};

const Text = withReactive<TextNative, TextProps>(
  ({ weight = 'md', textAlign, size = 'md', style, ...props }, ref) => {
    return (
      <TextNative
        ref={ref}
        {...props}
        {...rnw(
          textAlignStyles[textAlign],
          fontSizeStyles[size],
          fontWeightStyles[weight],
          useText.root,
          style
        )}
      />
    );
  }
);

Text.displayName = 'CrossedText';

export { Text };
