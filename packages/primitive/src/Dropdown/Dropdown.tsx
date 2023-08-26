import { forwardRef, type ComponentType } from 'react';

export const createDropdownMain = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <StyledRoot {...props} ref={ref} />;
  });
