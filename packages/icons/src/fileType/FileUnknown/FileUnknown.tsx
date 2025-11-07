/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const FileUnknown = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 32 40" fill="none">
      <Path
        d="M4 0.75H20C20.1212 0.75 20.2375 0.798088 20.3232 0.883789L31.1162 11.6768C31.2019 11.7625 31.25 11.8788 31.25 12V36C31.25 37.7949 29.7949 39.25 28 39.25H4C2.20507 39.25 0.75 37.7949 0.75 36V4C0.750001 2.20507 2.20508 0.75 4 0.75Z"
        stroke={colorFind}
        strokeWidth="1.5"
      />
      <Path
        d="M20 0.5V8C20 10.2091 21.7909 12 24 12H31.5"
        stroke={colorFind}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
