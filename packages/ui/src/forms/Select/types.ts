/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { BottomSheetProps } from '@devvie/bottom-sheet';
import type { MenuListProps } from 'src/display';

export type ContentProps = Partial<MenuListProps> & {
  sheetProps?: BottomSheetProps;
};
