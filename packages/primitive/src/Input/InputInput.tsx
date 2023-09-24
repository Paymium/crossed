import { type ComponentType, forwardRef } from 'react';
import { Slot } from '../utils/Slot';

export const createInput = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    return (
      <Slot {...props} ref={ref} asChild>
        <Styled {...(props as any)} />
      </Slot>
    );
  });
