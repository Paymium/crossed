/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useStyles } from '@crossed/styled/unistyles';
import type { IconProps } from '../types';

export const MousePointerClick = ({
  Svg,
  Path,
  color,
  size = 24,
}: IconProps) => {
  const { theme } = useStyles();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? (theme as any).colors.default}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m9 9 5 12 1.8-5.2L21 14Z" />
      <Path d="M7.2 2.2 8 5.1" />
      <Path d="m5.1 8-2.9-.8" />
      <Path d="M14 4.1 12 6" />
      <Path d="m6 12-1.9 2" />
    </Svg>
    // <Svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   strokeWidth="2"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    //   stroke={color ?? (theme as any).colors.default}
    // >
    //   <Path d="m6 9 6 6 6-6" />
    // </Svg>
  );
};
