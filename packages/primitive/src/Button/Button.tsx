import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import type { RequiredAccessibilityProps } from '../types';

export const createButtonMain = <T extends Record<string, any>>(
  StyledButton: ComponentType<T>
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<T, 'aria-label'>>((props, ref) => {
    const context = useContext();
    return (
      <StyledButton
        aria-disabled={Boolean(props.disabled ?? false).toString()}
        role="button"
        {...context}
        {...props}
        ref={ref}
      />
    );
  });
