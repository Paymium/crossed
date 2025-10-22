/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

export type UsePaginationParams = {
  pageCount: number;
  currentPageNumber: number;
  pageLinkBuilder: (_pageNumber: number) => string;
  pageShownCount: number;
  prevLabel?: string;
  nextLabel?: string;
};
