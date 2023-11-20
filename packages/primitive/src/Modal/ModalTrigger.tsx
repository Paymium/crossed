import { ComponentType, forwardRef } from 'react';
import type { RequiredAccessibilityProps } from '../types';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createModalTrigger = <P,>(Styled: ComponentType<P>) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { open, setOpen } = useContext();
    return (
      <Styled
        {...(props as any)}
        ref={ref}
        onPress={composeEventHandlers((props as any).onPress, () => {
          setOpen(!open);
        })}
      />
    );
  });
