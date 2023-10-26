import { ComponentType, forwardRef } from 'react';

export const createBadgeIcon = <T,>(StyledIcon: ComponentType<T>) =>
  forwardRef<any, T>((props, ref) => {
    return <StyledIcon {...props} ref={ref} />;
  });
