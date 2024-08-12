/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const Contrast = ({
  Svg,
  Path,
  Circle,
  color: colorProps,
  size = 24,
}: RequireOnly<'Path' | 'Svg' | 'Circle'>) => {
  const theme = useTheme();
  const color = colorProps ?? theme.font.color;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`${color}`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx="12" cy="12" r="10" stroke={`${color}`} />
      <Path d="M12 18a6 6 0 0 0 0-12v12z" stroke={`${color}`} />
    </Svg>
  );
};
