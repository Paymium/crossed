import { type ComponentType, forwardRef } from 'react';

export const createIcon = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <Styled {...props} ref={ref} />;
  });
