/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';

import { Table as Root, TBody, Td, Th, THead, Tr } from './Table';

export const Table = withStaticProperties(Root, { TBody, Td, Th, THead, Tr });
