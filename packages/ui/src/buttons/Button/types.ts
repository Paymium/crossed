/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedMethods } from '@crossed/styled';
import { PressableProps } from 'react-native';
import { alignSelfStyle } from '../../styles/alignItems';

type Variants =
  | 'primary'
  | 'tertiary'
  | 'secondary'
  | 'success'
  | 'error'
  | false;
type Sizes = 'sm' | 'md' | 'lg' | false;
export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Select button variant
   * @default primary
   */
  variant?: Variants;

  /**
   * Loading state of button
   * @type {boolean}
   */
  loading?: boolean;

  /**
   * Extend style of button
   * @type {CrossedMethods<any>}
   */
  style?: CrossedMethods<any>;

  /**
   * Disable size
   * @default md
   */
  size?: Sizes;

  /**
   * Set align-self style
   */
  alignSelf?: keyof typeof alignSelfStyle;
}
