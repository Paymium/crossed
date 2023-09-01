import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export const createDropdownOverlay = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { setOpen } = useContext();
    return (
      <Styled
        {...props}
        onClick={composeEventHandlers((props as any).onClick, () => {
          setOpen(false);
        })}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          ...(props as any).style,
        }}
        ref={ref}
      />
    );
  });
