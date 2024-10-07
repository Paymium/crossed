/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedMethods } from '@crossed/styled';
import { PressableProps } from 'react-native';

type Variants = 'primary' | 'tertiary' | 'secondary' | false;
export type ButtonProps = Omit<PressableProps, 'style'> & {
  /**
   * Select button variant
   * @default primary
   */
  variant?: Variants;
  /**
   * Select error colors
   * @type {boolean}
   */
  error?: boolean;
  /**
   * Loading state of button
   * @type {boolean}
   */
  loading?: boolean;
  /**
   * Extend style of button
   * @type {boolean}
   */
  style?: CrossedMethods<any>;
  /**
   * Disable size
   * @type {boolean}
   */
  size?: boolean;
};
