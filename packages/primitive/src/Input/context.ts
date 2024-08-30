/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';

export type States = {
  isActive: boolean;
  isFocus: boolean;
  isHover: boolean;
};

export type StyleRef = {
  style?: any;
  className?: any;
};

export type ContextInput = {
  states: States;
  setStates: (_style: Partial<States>) => void;
  inputRef: MutableRefObject<any>;
};

export const [InputProvider, useInputContext] = createScope<ContextInput>(
  null as unknown as ContextInput
);
