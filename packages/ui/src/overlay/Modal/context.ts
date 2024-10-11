/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createContext } from 'react';

export type VariantSize = { size: 'sm' | 'md' | 'lg' };

export const localContext = createContext<VariantSize>({ size: 'md' });
