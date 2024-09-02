/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { Root } from './Root';
import { Trigger } from './Trigger';
import { Frame } from './Frame';
import { Handle } from './Handle';
import { SnapVisible } from './SnapVisible';

export const Sheet = withStaticProperties(Root, {
  Trigger,
  Frame,
  Handle,
  SnapVisible,
});
