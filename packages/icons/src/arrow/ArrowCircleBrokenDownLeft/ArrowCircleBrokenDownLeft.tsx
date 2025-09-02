/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const ArrowCircleBrokenDownLeft = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.00023 9.00007V15.0001M9.00023 15.0001H15.0002M9.00023 15.0001L19 5.00001M21.6606 9.41051C22.5515 12.7467 21.6884 16.4538 19.0711 19.0711C15.1658 22.9764 8.83418 22.9764 4.92893 19.0711C1.02369 15.1659 1.02369 8.83424 4.92893 4.92899C7.54623 2.3117 11.2534 1.44852 14.5896 2.33944"
        stroke={colorFind}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
