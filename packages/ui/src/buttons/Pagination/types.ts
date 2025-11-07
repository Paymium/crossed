/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */ import { ComponentProps, PropsWithChildren } from 'react';
import { XBox } from '../../layout';

export type UsePaginationParams = {
  pageCount: number;
  currentPageNumber: number;
  pageLinkBuilder: (_pageNumber: number) => string;
  pageShownCount: number;
  prevLabel?: string;
  nextLabel?: string;
};

export type PaginationRootProps = ComponentProps<typeof XBox> &
  Pick<UsePaginationParams, 'pageCount' | 'currentPageNumber'> & {
    /**
     * Callback when page change (click on page)
     * @param page
     */
    onChangePage: (page: number) => void;
    /**
     * Next Label
     * @default >
     */
    nextLabel?: string;
    /**
     * Prev Label
     * @default <
     */
    prevLabel?: string;
    /**
     * Variant of pagination
     * @default square
     */
    variant?: 'circle' | 'square';
    /**
     * Show icon on prev/next button
     */
    hasIcon?: boolean;
  };
