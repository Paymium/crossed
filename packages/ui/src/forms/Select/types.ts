/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { BottomSheetProps } from '@devvie/bottom-sheet';
import type { MenuListProps } from '../../display/MenuList';
import type { ComponentType } from 'react';
import type { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';
// import type { ReferenceType, useFloating } from '@floating-ui/react';

export type FocusProps = ReactFocusOnProps;
export type FocusComponent = ComponentType<FocusProps>;

export type ContentProps = Partial<MenuListProps> & {
  sheetProps?: BottomSheetProps;
};

// export type UseFloating<T extends ReferenceType = ReferenceType> =
//   typeof useFloating<T>;
