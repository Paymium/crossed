/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const SwitchVertical2 = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 4V20M7 20L3 16M7 20L11 16M17 20V4M17 4L13 8M17 4L21 8"
        stroke={colorFind}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
