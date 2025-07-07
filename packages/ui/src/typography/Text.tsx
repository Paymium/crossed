/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  Text as TextNative,
  type TextProps as TextNativeProps,
} from 'react-native';
import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';
import {
  fontWeightStyles,
  fontSizeStyles,
  fontColorStyles,
  sizeTemplateStyles,
} from '../styles/typography';
import { textAlignStyles } from '../styles/textAlign';
import { memo } from 'react';

const useText = createStyles(({ font }) => ({
  root: {
    base: Object.assign(font.extraStyles, {
      color: font.color,
      fontFamily: font.family,
    }),
  },
}));

export interface TextProps extends Omit<TextNativeProps, 'style'> {
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
  weight?: keyof typeof fontWeightStyles;

  /**
   * select font-size
   */
  fontSize?: keyof typeof fontSizeStyles;

  /**
   * Select size template
   */
  size?: keyof typeof sizeTemplateStyles;

  /**
   * select text-align
   */
  textAlign?: keyof typeof textAlignStyles;

  /**
   * Element ref
   */
  ref?: React.Ref<TextNative> | undefined;
}

const Text = memo<TextProps>(
  ({
    weight,
    color = 'primary',
    textAlign,
    fontSize,
    style,
    size = 'default',
    ...props
  }) => {
    return (
      <TextNative
        ref={props.ref}
        {...props}
        {...composeStyles(
          sizeTemplateStyles[size],
          textAlignStyles[textAlign],
          fontSizeStyles[fontSize],
          fontWeightStyles[weight],
          useText.root,
          fontColorStyles[color],
          style
        ).rnw()}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text };
