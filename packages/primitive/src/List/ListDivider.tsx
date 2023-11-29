import { forwardRef, type ComponentType } from 'react';

export const createListDivider = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => <Styled {...props} ref={ref} />);
