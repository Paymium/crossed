/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { Content } from './Content';
import { ScrollView } from './ScrollView';
import { FlatList } from './FlatList';
import { SheetPadded } from './Padded';

export const Sheet = withStaticProperties(Root, {
  Trigger,
  Content,
  ScrollView,
  FlatList,
  Padded: SheetPadded,
});
