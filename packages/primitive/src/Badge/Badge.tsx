import { ComponentType, forwardRef } from 'react';

export const createBadgeMain = <T extends Record<string, any>>(
  Styled: ComponentType<T>
) =>
  forwardRef<any, T>((props, ref) => {
    return <Styled {...(props as any)} ref={ref} />;
  });
