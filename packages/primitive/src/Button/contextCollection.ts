/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createCollection } from '../utils';

const GROUP_NAME = 'ButtonGroup';

type ItemData = { id: string };
const [ButtonGroupCollection, useButtonGroupCollection] = createCollection<
  HTMLSpanElement,
  ItemData
>(GROUP_NAME);

export const {
  ItemSlot: ButtonGroupCollectionItemSlot,
  Provider: ButtonGroupCollectionProvider,
  Slot: ButtonGroupCollectionSlot,
} = ButtonGroupCollection;

export { ButtonGroupCollection, useButtonGroupCollection };
