/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType } from 'react';
import type { TextProps } from 'react-native';
import type { fontSizeStyles, fontWeightStyles } from '../../styles/typography';
import type { CrossedStyle } from '@crossed/styled';

export type LabelProps = Omit<TextProps, 'style'> & {
  size?: keyof typeof fontSizeStyles;
  weight?: keyof typeof fontWeightStyles;
  htmlFor?: string;
  disabled?: boolean;
  style?: CrossedStyle;
};
export type LabelComponent = ComponentType<LabelProps>;
