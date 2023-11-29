import { forwardRef, type ComponentType } from 'react';

export const createListLabel = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <Styled {...props} ref={ref} />);
