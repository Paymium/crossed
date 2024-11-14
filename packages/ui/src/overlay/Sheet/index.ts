/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { SheetContent } from './Content';
import { SheetFlatList } from './FlatList';
import { SnapVisible } from './SnapVisible';
import { SheetTitle } from './Title';
import { SheetFooter } from './Footer';

export const Sheet = withStaticProperties(Root, {
  Trigger,
  Content: SheetContent,
  FlatList: SheetFlatList,
  SnapVisible,
  Title: SheetTitle,
  Footer: SheetFooter,
});
