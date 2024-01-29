import { forwardRef, type ComponentType } from 'react';
import { useContext } from './context';

export type CreateInputInputProps = { ariaLabelledby: string };
export const createInputInput = <P extends Record<string, any>>(
  Comp: ComponentType<P & CreateInputInputProps>
) => {
  return forwardRef((props: P, ref) => {
    const context = useContext();
    return <Comp ariaLabelledby={context.id} {...props} ref={ref} />;
  });
};
