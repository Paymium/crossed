import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import type { RequiredAccessibilityProps } from '../types';

export const createButtonMain = <T,>(StyledButton: ComponentType<T>) =>
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<T, 'aria-label'>>((props, ref) => {
    const context = useContext();
    return <StyledButton {...context} {...props} ref={ref} />;
  });
