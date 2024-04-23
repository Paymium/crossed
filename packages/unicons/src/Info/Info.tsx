/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const Info = ({
  Svg,
  Path,
  Circle,
  color,
  size = 24,
}: RequireOnly<'Path' | 'Svg' | 'Circle'>) => {
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
      <Circle cx="12" cy="12" r="10" stroke={stroke} />
      <Path d="M12 16v-4" stroke={stroke} />
      <Path d="M12 8h.01" stroke={stroke} />
    </Svg>
  );
};
