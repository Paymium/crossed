/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { YBoxProps } from '../../layout';
import type { PressableProps } from 'react-native';
import { CrossedMethods } from '@crossed/styled';

export type Context = {
  /**
   * Apply border radius
   */
  rounded?: boolean;
};
export type MenuListProps = YBoxProps &
  Partial<Context> & {
    /**
     * Apply padding
     */
    padded?: boolean;

    /**
     * Apply border
     */
    bordered: boolean;
  };

export type MenuListItemProps = Omit<PressableProps, 'style'> & {
  asChild?: boolean;
  style?: CrossedMethods<any>;
};
