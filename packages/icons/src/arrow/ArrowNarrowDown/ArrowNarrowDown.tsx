/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const ArrowNarrowDown = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4V20M12 20L18 14M12 20L6 14"
        stroke={colorFind}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
