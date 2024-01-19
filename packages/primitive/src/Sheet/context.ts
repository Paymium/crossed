/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';

export type ContextSheet = {
  open: boolean;
  setOpen: (_value: boolean) => void;
  id: string;
};
export const [Provider, useContext] = createScope<ContextSheet>(
  {} as ContextSheet
);
