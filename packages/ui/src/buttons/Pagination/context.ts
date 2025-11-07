import { createScope } from '@crossed/core';
import { PaginationRootProps } from './types';
import { PageLink } from './usePagination';

export const [VariantProvider, useVariantProvider] = createScope<
  Pick<PaginationRootProps, 'variant'>
>({});

type PagesContext = Pick<PaginationRootProps, 'onChangePage' | 'hasIcon'> & {
  pages: PageLink[];
  nextPage?: PageLink;
  prevPage?: PageLink;
};
export const [PagesProvider, usePagesProvider] = createScope<PagesContext>({
  pages: [],
} as PagesContext);
