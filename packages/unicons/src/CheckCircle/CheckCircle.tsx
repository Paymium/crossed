/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const CheckCircle = ({
  Svg,
  Path,
  color,
  size = 24,
}: RequireOnly<'Path' | 'Svg'>) => {
  const theme = useTheme();
  const stroke = color ?? theme.font.color;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke}
    >
      <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={stroke} />
      <Path d="m9 11 3 3L22 4" stroke={stroke} />
    </Svg>
  );
};
