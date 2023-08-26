import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createSheetOverlay = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { setOpen } = useContext();
    return (
      <Styled
        {...props}
        onClick={composeEventHandlers((props as any).onClick, () => {
          setOpen(false);
        })}
        ref={ref}
      />
    );
  });
