import { forwardRef, type ComponentType } from 'react';

export const createDropdownDivider = <P,>(StyledRoot: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <StyledRoot role="separator" {...props} ref={ref} />;
  });
