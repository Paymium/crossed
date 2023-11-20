import { ComponentType, forwardRef } from 'react';

export const createSheetHandle = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return <Styled {...(props as any)} ref={ref} />;
  });
