/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const X = ({
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
      <Path d="M18 6 6 18" stroke={stroke} />
      <Path d="m6 6 12 12" stroke={stroke} />
    </Svg>
  );
};
