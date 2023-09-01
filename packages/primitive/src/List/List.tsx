import { ComponentType, forwardRef } from 'react';

export const createListMain = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => (
    <StyledRoot role="list" {...props} ref={ref} />
  ));
