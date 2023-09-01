import { ComponentType, forwardRef } from 'react';
import type { RequiredAccessibilityProps } from 'src/types';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createModalTrigger = <P,>(Styled: ComponentType<P>) =>
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { open, setOpen } = useContext();
    return (
      <Styled
        {...(props as any)}
        ref={ref}
        onClick={composeEventHandlers((props as any).onClick, () => {
          setOpen(!open);
        })}
      />
    );
  });
