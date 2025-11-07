import { Button } from '../Button';
import { ArrowRight } from '@crossed/icons';
import { usePagesProvider } from './context';

export const PaginationNext = () => {
  const { nextPage, onChangePage, hasIcon } = usePagesProvider();
  return !!nextPage ? (
    <Button
      size={'sm'}
      disabled={nextPage.disabled || !nextPage.href}
      onPress={() => onChangePage(Number(nextPage.pageNumber))}
      variant={'secondary'}
    >
      {!!nextPage.linkContent && (
        <Button.Text fontWeight={'medium'} fontSize={'sm'}>
          {nextPage.linkContent}
        </Button.Text>
      )}
      {hasIcon && (
        <Button.Icon>
          <ArrowRight size={20} />
        </Button.Icon>
      )}
    </Button>
  ) : null;
};
