/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';

export type FloatingContext = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  visibilityHidden?: boolean;
};

export const [FloatingProvider, useFloatingContext] =
  createScope<FloatingContext>({} as FloatingContext);
