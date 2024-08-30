/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const AlertTriangle = ({
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
      <Path
        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        stroke={stroke}
      />
      <Path d="M12 9v4" stroke={stroke} />
      <Path d="M12 17h.01" stroke={stroke} />
    </Svg>
  );
};
