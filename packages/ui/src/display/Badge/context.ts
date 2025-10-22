/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import { Context } from './type';

export const [Provider, useContext] = createScope<Context>({} as Context);
export const [ProviderGroup, useContextGroup] = createScope<Context>(
  {} as Context
);
