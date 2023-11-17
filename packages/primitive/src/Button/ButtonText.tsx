import { AriaAttributes, ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createButtonText = <
  T extends Record<string, any> & AriaAttributes
>(
  StyledText: ComponentType<T>
) =>
  forwardRef<any, Omit<T, 'children' | 'ref'> & { children: string }>(
    (props, ref) => {
      const context = useContext();
      return <StyledText id={context.id} {...(props as any)} ref={ref} />;
    }
  );
