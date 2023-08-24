import { forwardRef } from 'react';
import { useContext } from './context';

export const createButtonMain = <T,>(StyledButton: React.ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return <StyledButton {...context} {...props} ref={ref} />;
  });
