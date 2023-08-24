import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createButtonText = <T,>(StyledText: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return <StyledText {...context} {...props} ref={ref} />;
  });
