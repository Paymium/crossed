import type { ComponentType } from 'react';
import { useContext } from './context';

export type CreateLabelProps = { id: string };

export const createLabel = <P extends Record<string, any>>(
  Comp: ComponentType<P & CreateLabelProps>
) => {
  return (props: P) => {
    const context = useContext();
    return <Comp id={context.id} {...props} />;
  };
};
