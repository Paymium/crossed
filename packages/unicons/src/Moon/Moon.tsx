/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useStyle } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const Moon = ({
  Svg,
  Path,
  color,
  size = 25,
}: RequireOnly<'Svg' | 'Path'>) => {
  const { theme } = useStyle();
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? (theme as any).colors.default}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Svg>
  );
};
