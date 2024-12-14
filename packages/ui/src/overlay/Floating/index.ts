/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
export { FloatingTrigger, type FloatingTriggerProps } from './Trigger';
import { FloatingTrigger } from './Trigger';
export { FloatingContent, type FloatingContentProps } from './Content';
import { FloatingContent } from './Content';
export { FloatingOverlay, type FloatingOverlayProps } from './Overlay';
import { FloatingOverlay } from './Overlay';
export { type FloatingProps, type FloatingRef } from './Root';
import { FloatingRoot } from './Root';
export { FloatingPortal, type FloatingPortalProps } from './Portal';
import { FloatingPortal } from './Portal';
import { FloatingVisibilityHidden } from './VisibilityHidden';

export const Floating = withStaticProperties(FloatingRoot, {
  Trigger: FloatingTrigger,
  Content: FloatingContent,
  VisibilityHidden: FloatingVisibilityHidden,
  Portal: FloatingPortal,
  Overlay: FloatingOverlay,
});
