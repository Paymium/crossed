import { Button } from '../Button';
import { ArrowLeft } from '@crossed/icons';
import { Adapt } from '../../other';
import { usePagesProvider } from './context';

export const PaginationPrev = () => {
  const { prevPage, onChangePage, hasIcon } = usePagesProvider();
  return prevPage ? (
    <Button
      size={'sm'}
      disabled={prevPage.disabled || !prevPage.href}
      onPress={() => onChangePage(Number(prevPage.pageNumber))}
      variant={'secondary'}
    >
      {hasIcon && (
        <Button.Icon>
          <ArrowLeft size={20} />
        </Button.Icon>
      )}
      {!!prevPage.linkContent && (
        <Adapt size={'md'}>
          <Button.Text fontWeight={'medium'} fontSize={'sm'}>
            {prevPage.linkContent}
          </Button.Text>
        </Adapt>
      )}
    </Button>
  ) : null;
};
