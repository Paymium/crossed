import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createModalTitle = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { id } = useContext();
    return <Styled id={`${id}-title`} {...props} ref={ref} />;
  });
