import { type ComponentType, forwardRef } from 'react';

export const createInputElement = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <Styled {...(props as any)} ref={ref} />;
  });
