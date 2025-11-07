import { PaginationButton } from './Button';
import { XBox } from '../../layout';
import { usePagesProvider } from './context';

export const PagesLink = () => {
  const { pages, onChangePage } = usePagesProvider();
  return (
    <XBox alignItems={'center'}>
      {pages.map(
        ({ href, linkContent, disabled, isCurrent, pageNumber }, i) => {
          return (
            <PaginationButton
              key={`${href}-${i}-button`}
              disabled={disabled || !href}
              onPress={() => onChangePage(Number(pageNumber))}
              isCurrent={isCurrent}
            >
              {linkContent}
            </PaginationButton>
          );
        }
      )}
    </XBox>
  );
};
