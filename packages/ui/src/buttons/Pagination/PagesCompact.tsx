import { usePagesProvider } from './context';
import { Text } from '../../typography';
import { ComponentProps } from 'react';
import { PageLink } from './usePagination';

export const PagesCompact = ({
  render = (first, last) => `Page ${first.linkContent} of ${last.linkContent}`,
  ...props
}: ComponentProps<typeof Text> & {
  render?: (first: PageLink, last: PageLink) => string;
}) => {
  const { pages } = usePagesProvider();
  const [first] = pages;
  const last = pages[pages.length - 1];
  return (
    <Text color={'secondary'} fontSize={'sm'} fontWeight={'medium'} {...props}>
      {render(first, last)}
    </Text>
  );
};
