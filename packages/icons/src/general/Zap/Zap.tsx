/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { RequireOnly } from '../../types';
import { useColor } from '../../utils';

export const Zap = ({
  Svg,
  Path,
  size = 24,
  color,
}: RequireOnly<'Path' | 'Svg'>) => {
  const colorFind = useColor(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.8333 1.6665L3.41118 10.573C3.12051 10.9219 2.97517 11.0963 2.97295 11.2436C2.97102 11.3716 3.02808 11.4934 3.12768 11.5739C3.24226 11.6665 3.46928 11.6665 3.92333 11.6665H9.99997L9.16663 18.3332L16.5888 9.42663C16.8794 9.07782 17.0248 8.90341 17.027 8.75612C17.0289 8.62807 16.9719 8.50625 16.8723 8.42576C16.7577 8.33317 16.5307 8.33317 16.0766 8.33317H9.99997L10.8333 1.6665Z"
        stroke={colorFind}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
