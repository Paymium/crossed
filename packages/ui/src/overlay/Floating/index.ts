/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { FloatingTrigger } from './Trigger';
import { FloatingContent } from './Content';
import { FloatingOverlay } from './Overlay';
import { FloatingRoot } from './Root';
import { FloatingPortal } from './Portal';

export const Floating = withStaticProperties(FloatingRoot, {
  Trigger: FloatingTrigger,
  Content: FloatingContent,
  Portal: FloatingPortal,
  Overlay: FloatingOverlay,
});
