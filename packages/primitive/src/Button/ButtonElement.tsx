import { ComponentType, forwardRef } from 'react';

export const createButtonElement = <T,>(StyledElement: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    return <StyledElement {...props} ref={ref} />;
  });
