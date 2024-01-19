/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { MutableRefObject } from 'react';
import type { View } from 'react-native';

export type ContextLabel = {
  id?: string;
  inputRef?: MutableRefObject<View | undefined>;
};
export const [Provider, useContext] = createScope<ContextLabel>({
  id: undefined,
  inputRef: undefined,
});
