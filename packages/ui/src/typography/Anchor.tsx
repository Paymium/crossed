/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeStyles,
  createStyles,
  useInteraction,
  type CrossedMethods,
} from '@crossed/styled';
import { Text, type TextProps } from './Text';
import { forwardRef } from 'react';
import { textStyles } from '../buttons/Button';

export const useAnchor = createStyles((t) => ({
  anchor: {
    'base': {
      fontFamily: t.font.family,
      textDecorationLine: 'none',
      cursor: 'pointer',
    },
    ':hover': {
      textDecorationLine: 'underline',
      color: t.colors.primary.primary,
    },
  },
}));

export const anchorStyles = createStyles(({ colors }) => ({
  text: {
    base: { textDecorationLine: 'underline' },
  },
  underline: {
    ':hover': { textDecorationLine: 'underline' },
    ':active': { textDecorationLine: 'underline' },
    ':focus': { textDecorationLine: 'underline' },
  },
  primary: {
    base: { color: colors.text.brand, textDecorationColor: colors.text.brand },
  },
  default: {
    base: {
      color: colors.text.primary,
      textDecorationColor: colors.text.primary,
    },
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
   * Indicates whether the anchor should use the "primary" style. Default is true.
   *
   * @type {boolean}
   */
  primary?: boolean;

  /**
   * Indicates whether the anchor text should be underlined. Default is true.
   *
   * @type {boolean}
   */
  underline?: boolean;

  /**
   * The target URL the anchor points to.
   *
   * @type {string}
   */
  href?: string;
};

export const Anchor = forwardRef<Text, AnchorProps>(
  ({ primary = true, underline = true, style, href = '', ...props }, ref) => {
    const { state, props: interactionProps } = useInteraction(props);

    return (
      <Text
        role="link"
        {...({ href: href || '' } as any)}
        weight="lg"
        {...props}
        {...state}
        {...interactionProps}
        style={composeStyles(
          textStyles.default,
          anchorStyles.text,
          primary ? anchorStyles.primary : anchorStyles.default,
          underline && anchorStyles.underline,
          style
        )}
        ref={ref as any}
      />
    );
  }
);
