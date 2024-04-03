/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedPropsExtended, Themes } from './types';
import { useStyles } from './useStyles';

export const createStyles = <C extends string, S>(
  styles: (_theme: Themes[keyof Themes]) => Record<C, S>
) => {
  return (p?: CrossedPropsExtended<S>) => useStyles(styles, p);
};
