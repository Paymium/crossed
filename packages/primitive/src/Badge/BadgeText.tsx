import { ComponentType, forwardRef } from 'react';

export const createBadgeText = <T,>(StyledText: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    return <StyledText {...props} ref={ref} />;
  });
