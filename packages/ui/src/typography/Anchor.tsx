/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeStyles,
  createStyles,
  type CrossedMethods,
} from '@crossed/styled';
import { Text, type TextProps } from './Text';
import { forwardRef } from 'react';

export const anchorStyles = createStyles(({ colors, radius }) => ({
  default: {
    'base': {
      color: colors.text.tertiary.default,
      textDecorationColor: colors.text.tertiary.default,
      borderRadius: radius.xs,
    },
    ':hover': {
      textDecorationLine: 'underline',
    },
    ':active': {
      outlineWidth: 2,
      outlineOffset: 2,
      outlineStyle: 'solid',
      outlineColor: colors.background.primary.default,
    },
    'web': { base: { cursor: 'pointer' } },
  },
  primary: {
    'base': {
      color: colors.text.brand.secondary.default,
      textDecorationColor: colors.text.brand.secondary.hover,
    },
    ':hover': {
      color: colors.text.brand.secondary.hover,
      textDecorationLine: 'underline',
    },
  },
}));

/**
 * Properties for an Anchor component, derived from TextProps with some modifications.
 */
export type AnchorProps = Omit<TextProps, 'style' | 'color'> & {
  /**
   * Optional style for the anchor, which can combine crossed methods.
   *
   * @type {CrossedMethods<any, any>}
   */
  style?: CrossedMethods<any, any>;

  /**
   * The target URL the anchor points to.
   *
   * @type {string}
   */
  href?: string;

  primary?: boolean;
};

export const Anchor = forwardRef<Text, AnchorProps>(
  ({ style, primary = true, ...props }, ref) => {
    return (
      <Text
        role="link"
        fontWeight="medium"
        {...props}
        style={composeStyles(
          anchorStyles.default,
          primary && anchorStyles.primary,
          style
        )}
        ref={ref as any}
      />
    );
  }
);
Anchor.displayName = 'Anchor';
