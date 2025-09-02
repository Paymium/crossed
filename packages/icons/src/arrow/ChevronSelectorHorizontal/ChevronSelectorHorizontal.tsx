/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const ChevronSelectorHorizontal = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 7L4 12L9 17M15 7L20 12L15 17"
        stroke={colorFind}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
