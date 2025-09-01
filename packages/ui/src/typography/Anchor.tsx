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
  default: {
    base: {
      color: colors.text.brand.tertiary.default,
      textDecorationColor: colors.text.brand.tertiary.default,
    },
    ':hover': {
      textDecorationLine: 'underline',
      color: colors.text.brand.secondary.default,
      textDecorationColor: colors.text.brand.secondary.default,
    },
    ':active': {},
    web: { base: { cursor: 'pointer' } },
  },
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
   * The target URL the anchor points to.
   *
   * @type {string}
   */
  href?: string;
};

export const Anchor = forwardRef<Text, AnchorProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        role="link"
        weight="lg"
        {...props}
        style={composeStyles(anchorStyles.default, style)}
        ref={ref as any}
      />
    );
  }
);
Anchor.displayName = 'Anchor';
