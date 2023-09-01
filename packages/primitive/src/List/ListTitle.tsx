import { ComponentType, forwardRef } from 'react';

export const createListTitle = <P,>(StyledTitle: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <StyledTitle {...props} ref={ref} />);
