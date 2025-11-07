/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useMemo } from 'react';
import { UsePaginationParams } from './types';
import { nextLabel as nextLabelSingleton, prevLabel as prevLabelSingleton} from "./singleton"

export const PAGE_LINK_TYPES = {
  page: 'page',
  prev: 'prev',
  ellipsis: 'ellipsis',
  next: 'next',
};
type PageType = keyof typeof PAGE_LINK_TYPES;
type AriaType = { label: string; current?: string };
export interface PageLink {
  type: PageType;
  href: string | null;
  linkContent: string;
  isCurrent?: boolean;
  aria?: AriaType;
  disabled?: boolean;
  pageNumber?: string | number;
}

const ELLIPSIS_ITEM: PageLink = {
  type: PAGE_LINK_TYPES.ellipsis as PageType,
  href: null,
  linkContent: '...',
};

const excludeNullLinks = (link: any) => link !== null;
const INDEX_ONE_ARRAY = 1; // We want an array that starts at 1 no 0

const usePagination = ({
  pageCount,
  currentPageNumber,
  pageLinkBuilder,
  pageShownCount,
  prevLabel = prevLabelSingleton,
  nextLabel = nextLabelSingleton,
  // prevLabel,
  // nextLabel,
}: UsePaginationParams): Array<PageLink> => {
  const buildLink = (
    type: PageType,
    pageNumber: number,
    isCurrent?: boolean
  ): PageLink => ({
    type,
    href: pageLinkBuilder(pageNumber),
    linkContent: pageNumber.toString(),
    isCurrent,
    pageNumber,
    aria: {
      label: `Page ${pageNumber}`,
      current: isCurrent ? 'page' : '',
    },
  });
  return useMemo<Array<PageLink>>((): Array<PageLink> => {
    const allPagesNumbers = Array.from(Array(pageCount).keys()).map(
      (i) => i + INDEX_ONE_ARRAY
    );
    const before = allPagesNumbers.slice(
      currentPageNumber - 1 - pageShownCount,
      currentPageNumber - 1
    );
    const lastPageNumber = allPagesNumbers[allPagesNumbers.length - 1];
    const after = allPagesNumbers.slice(
      currentPageNumber,
      currentPageNumber + pageShownCount
    );
    const isStart = before.length > after.length;
    const isEnd = !isStart;

    const links = [...before, currentPageNumber, ...after].map(
      (pageNumber: number): PageLink | null => {
        const isCurrent = pageNumber === currentPageNumber;
        return buildLink(
          PAGE_LINK_TYPES.page as PageType,
          pageNumber,
          isCurrent
        );
      }
    );

    return [
      {
        ...buildLink(PAGE_LINK_TYPES.prev as PageType, currentPageNumber - 1),
        linkContent: prevLabel,
        disabled: currentPageNumber === 1,
      },
      currentPageNumber - pageShownCount > -1 &&
      currentPageNumber - pageShownCount !== 1
        ? buildLink(PAGE_LINK_TYPES.page as PageType, 1)
        : null,
      (!isStart && currentPageNumber > 4) ||
      (isStart && currentPageNumber - pageShownCount !== 2)
        ? ELLIPSIS_ITEM
        : null,
      ...links,
      isEnd && currentPageNumber + pageShownCount < pageCount - 1
        ? ELLIPSIS_ITEM
        : null,
      isEnd && currentPageNumber + pageShownCount < pageCount
        ? buildLink(PAGE_LINK_TYPES.page as PageType, lastPageNumber)
        : null,
      {
        ...buildLink(PAGE_LINK_TYPES.next as PageType, currentPageNumber + 1),
        linkContent: nextLabel,
        disabled: currentPageNumber === lastPageNumber,
      },
    ].filter(excludeNullLinks) as PageLink[];
  }, [pageCount, currentPageNumber]);
};

export default usePagination;
