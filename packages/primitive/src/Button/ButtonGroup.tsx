import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { ProviderGroup } from './contextGroup';

export const createButtonGroup = <T,>(StyledGroup: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return (
      <ProviderGroup value={{}}>
        <StyledGroup {...context} {...props} ref={ref} />
      </ProviderGroup>
    );
  });
