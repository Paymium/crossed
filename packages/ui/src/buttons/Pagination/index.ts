/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { PaginationNext } from './NextButton';
import { PaginationPrev } from './PrevButton';
import { PaginationRoot } from './Root';
import { PagesLink } from './PagesLink';
import { PagesCompact } from './PagesCompact';

export * from "./singleton"
export const Pagination = withStaticProperties(PaginationRoot, {
  Next: PaginationNext,
  Prev: PaginationPrev,
  Links: PagesLink,
  Compact: PagesCompact,
});
