import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createButtonIcon = <T,>(StyledIcon: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return <StyledIcon {...context} {...props} ref={ref} />;
  });
