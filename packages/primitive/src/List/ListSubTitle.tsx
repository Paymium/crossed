import { forwardRef, type ComponentType } from 'react';

export const createListSubTitle = <P,>(StyledSubTitle: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <StyledSubTitle {...props} ref={ref} />);
