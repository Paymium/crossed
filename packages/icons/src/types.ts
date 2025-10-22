/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ElementType, JSX } from 'react';
import type { Circle, Path, Svg } from 'react-native-svg';
import { Colors } from '@crossed/theme';

export type IconProps = {
  Svg?: ElementType<JSX.IntrinsicElements['svg']> | typeof Svg;
  Path?: ElementType<JSX.IntrinsicElements['path']> | typeof Path;
  Circle?: ElementType<JSX.IntrinsicElements['circle']> | typeof Circle;

  /**
   * color of icon
   * @default text.primary.default
   */
  color?: ColorPaths;

  /**
   * size of icon
   * @default 24
   */
  size?: number;
};

export type RequireOnly<K extends keyof IconProps> = Required<
  Pick<IconProps, K>
> &
  Omit<IconProps, K>;

type PathImpl<T, Prev extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, any> // si encore un objet
    ? `${Prev}${K}` | PathImpl<T[K], `${Prev}${K}.`>
    : `${Prev}${K}`;
}[keyof T & string];

// Usage
export type ColorPaths = PathImpl<Colors>;
