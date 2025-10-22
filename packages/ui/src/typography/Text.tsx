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
import { memo } from 'react';

const useText = createStyles(({ font }) => ({
  root: {
    base: {
      color: font.color,
      fontFamily: font.family,
    },
  },
}));

export type TextProps = Omit<TextNativeProps, 'style'> & {
  /**
   * Color of text
   */
  color?: keyof typeof fontColorStyles;

  /**
   * Extends style
   */
  style?: CrossedMethods<any>;

  /**
   * Select font-weight
   */
  fontWeight?: keyof typeof fontWeightStyles;

  /**
   * select font-size
   */
  fontSize?: keyof typeof fontSizeStyles;

  /**
   * select text-align
   */
  textAlign?: keyof typeof textAlignStyles;

  /**
   * Element ref
   */
  ref?: React.Ref<TextNative> | undefined;
};

const Text = memo<TextProps>(
  withReactive(
    ({
      fontWeight = 'regular',
      color = 'primary',
      fontSize = 'md',
      textAlign,
      style,
      ...props
    }) => {
      return (
        <TextNative
          ref={props.ref}
          {...props}
          {...composeStyles(
            textAlignStyles[textAlign],
            fontSizeStyles[fontSize],
            fontWeightStyles[fontWeight],
            useText.root,
            fontColorStyles[color],
            style
          ).rnw()}
        />
      );
    }
  )
);
Text.displayName = 'Text';

export { Text };
