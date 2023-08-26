import { ComponentType, forwardRef } from 'react';

export const createListItem = <P,>(StyledItem: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => (
    <StyledItem role="listitem" {...props} ref={ref} />
  ));
