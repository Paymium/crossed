/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Root } from './Root';
export { Trigger as SheetTrigger } from './Trigger';
import { Trigger } from './Trigger';
export { SheetContent } from './Content';
import { SheetContent } from './Content';
export { SheetFlatList } from './FlatList';
import { SheetFlatList } from './FlatList';
export { SnapVisible as SheetSnapVisible } from './SnapVisible';
import { SnapVisible } from './SnapVisible';
export { SheetTitle } from './Title';
import { SheetTitle } from './Title';
export { SheetFooter } from './Footer';
import { SheetFooter } from './Footer';

export const Sheet = withStaticProperties(Root, {
  Trigger,
  Content: SheetContent,
  FlatList: SheetFlatList,
  SnapVisible,
  Title: SheetTitle,
  Footer: SheetFooter,
});
