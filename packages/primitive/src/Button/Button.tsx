import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createButtonMain = <T extends Record<string, any>>(
  StyledButton: ComponentType<T>
) =>
  forwardRef<any, T>((props, ref) => {
    const context = useContext();
    return (
      <StyledButton
        aria-disabled={Boolean(props.disabled ?? false)}
        aria-labelledby={context.id}
        role="button"
        {...(props as any)}
        ref={ref}
      />
    );
  });
