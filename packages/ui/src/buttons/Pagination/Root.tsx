/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { XBox } from '../../layout';
import usePagination from './usePagination';
import { UsePaginationParams } from './types';
import { Button } from '../Button';

export const PaginationRoot = (
  props: Pick<UsePaginationParams, 'pageCount' | 'currentPageNumber'>
) => {
  const { pageCount, currentPageNumber } = props;
  const pages = usePagination({
    pageCount,
    currentPageNumber: Number(currentPageNumber),
    pageLinkBuilder: (index) => `page=${index}`,
    pageShownCount: 2,
  });
  return (
    pageCount > 1 && (
      <XBox>
        {pages.map(
          ({ href, linkContent, disabled /*, isCurrent, pageNumber*/ }, i) => {
            return (
              <Button
                key={`${href}-${i}-button`}
                disabled={disabled || !href}
                variant={'tertiary'}
                // variant={
                //   isCurrent ? 'primary' : !href ? 'tertiary' : 'tertiary'
                // }
                // onPress={() => onChangePage(Number(pageNumber))}
              >
                <Button.Text>{linkContent}</Button.Text>
              </Button>
            );
          }
        )}
      </XBox>
    )
  );
};
PaginationRoot.displayName = 'Pagination';
