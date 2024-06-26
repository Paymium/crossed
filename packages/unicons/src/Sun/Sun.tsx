/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../types';
import { useTheme } from '@crossed/styled';

export const Sun = ({
  Svg,
  Path,
  Circle,
  color,
  size = 25,
}: RequireOnly<'Svg' | 'Path' | 'Circle'>) => {
  const theme = useTheme();
  const stroke = theme.font.color;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx="12" cy="12" r="4" stroke={color ?? stroke} />
      <Path d="M12 2v2" stroke={color ?? stroke} />
      <Path d="M12 20v2" stroke={color ?? stroke} />
      <Path d="m4.93 4.93 1.41 1.41" stroke={color ?? stroke} />
      <Path d="m17.66 17.66 1.41 1.41" stroke={color ?? stroke} />
      <Path d="M2 12h2" stroke={color ?? stroke} />
      <Path d="M20 12h2" stroke={color ?? stroke} />
      <Path d="m6.34 17.66-1.41 1.41" stroke={color ?? stroke} />
      <Path d="m19.07 4.93-1.41 1.41" stroke={color ?? stroke} />
    </Svg>
  );
};
