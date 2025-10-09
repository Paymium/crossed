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

export const anchorStyles = createStyles(({ colors }) => ({
  text: { web: { base: { cursor: 'pointer' } } },
  underline: {
    ':hover': { textDecorationLine: 'underline' },
    ':active': { textDecorationLine: 'underline' },
    ':focus': { textDecorationLine: 'underline' },
  },
  primary: { base: { textDecorationColor: colors.text.brand } },
  default: { base: { textDecorationColor: colors.text.primary } },
}));

/**
 * Properties for an Anchor component, derived from TextProps with some modifications.
 */
export type AnchorProps = Omit<TextProps, 'style'> & {
  /**
   * Optional style for the anchor, which can combine crossed methods.
   *
   * @type {CrossedMethods<any, any>}
   */
  style?: CrossedMethods<any, any>;

  /**
   * Indicates whether the anchor should use the "primary" style. Default is true.
   *
   * @type {boolean}
   * @default true
   */
  primary?: boolean;

  /**
   * The target URL the anchor points to.
   *
   * @type {string}
   */
  href?: string;
};

export const Anchor = forwardRef<Text, AnchorProps>(
  ({ primary = true, style, ...props }, ref) => {
    return (
      <Text
        role="link"
        fontWeight="lg"
        color={primary ? 'brand' : 'default'}
        {...props}
        style={composeStyles(
          anchorStyles.text,
          anchorStyles.underline,
          primary ? anchorStyles.primary : anchorStyles.default,
          style
        )}
        ref={ref as any}
      />
    );
  }
);
Anchor.displayName = 'Anchor';
