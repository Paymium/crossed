/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ElementType } from 'react';
import type { Circle, Path, Svg } from 'react-native-svg';

export type IconProps = {
  Svg?: ElementType<JSX.IntrinsicElements['svg']> | typeof Svg;
  Path?: ElementType<JSX.IntrinsicElements['path']> | typeof Path;
  Circle?: ElementType<JSX.IntrinsicElements['circle']> | typeof Circle;
  color?: string;
  size?: number;
};

export type RequireOnly<K extends keyof IconProps> = Required<
  Pick<IconProps, K>
> &
  Omit<IconProps, K>;
