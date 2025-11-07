/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { XBox } from '../../layout';
import usePagination, { PageLink } from './usePagination';
import { PaginationRootProps, UsePaginationParams } from './types';
import { Button } from '../Button';
import { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from '@crossed/icons';
import { PaginationButton } from './Button';
import { Adapt } from '../../other';
import { PagesProvider, VariantProvider } from './context';
import { composeStyles, inlineStyle } from '@crossed/styled';
import { paddingTopStyles } from '../../styles';

export const PaginationRoot = ({
  pageCount,
  currentPageNumber,
  onChangePage,
  nextLabel,
  prevLabel,
  variant = 'square',
  children,
                                 hasIcon,
  ...props
}: PaginationRootProps) => {
  const pagesHook = usePagination({
    pageCount,
    currentPageNumber: Number(currentPageNumber),
    pageLinkBuilder: (index) => `page=${index}`,
    pageShownCount: 2,
    nextLabel,
    prevLabel,
  });

  const { pages, nextPage, prevPage } = pagesHook.reduce<{
    prevPage?: PageLink;
    nextPage?: PageLink;
    pages: PageLink[];
  }>(
    (acc, page) => {
      if (page.type === 'prev') {
        acc.prevPage = page;
      } else if (page.type === 'next') {
        acc.nextPage = page;
      } else {
        acc.pages.push(page);
      }
      return acc;
    },
    {
      prevPage: undefined,
      nextPage: undefined,
      pages: [],
    }
  );
  return (
    pageCount > 1 && (
      <VariantProvider variant={variant}>
        <PagesProvider
          pages={pages}
          nextPage={nextPage}
          prevPage={prevPage}
          onChangePage={onChangePage}
          hasIcon={hasIcon}
        >
          <XBox
            alignItems={'center'}
            justifyContent={'between'}
            {...props}
            style={composeStyles(
              inlineStyle(({ colors }) => ({
                base: {
                  borderTopWidth: 1,
                  borderColor: colors.border.secondary.default,
                  borderStyle: 'solid',
                },
              })),
              paddingTopStyles['2xl'],
              props.style
            )}
          >
            {children}
          </XBox>
        </PagesProvider>
      </VariantProvider>
    )
  );
};
PaginationRoot.displayName = 'Pagination';
