/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps } from 'react';
import { Box } from '../../layout/Box';
import { StyleSheet } from '@crossed/styled';
import { badgeSizeStyle } from './styles';

export type ColorsBadge =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'grayBlue'
  | 'blueLight'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange';
export type ColorsBadgeStyle = Record<ColorsBadge, StyleSheet>;
export type Context = {
  /**
   * Defines the visual style of the badge (e.g. success, error, warning).
   */
  variant: ColorsBadge;

  /**
   * Controls the badge size.
   * Possible values come from `badgeSizeStyle` except for `'group'`.
   */
  size?: Exclude<keyof typeof badgeSizeStyle, 'group'>;

  /**
   * If true, applies fully rounded corners (pill shape).
   * If false, the badge keeps standard rounded corners.
   */
  rounded: boolean;
};
export type BadgeProps = ComponentProps<typeof Box> & Partial<Context>;
