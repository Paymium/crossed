import { composeEventHandlers } from '@crossed/core';
import { ComponentType, forwardRef } from 'react';
import { useContext } from './context';

export const createSheetHandle = <P,>(Styled: ComponentType<P>) =>
  forwardRef<any, P>((props, ref) => {
    const { setOpen } = useContext();
    return (
      <Styled
        {...(props as any)}
        onPress={composeEventHandlers((props as any).onPress, () =>
          setOpen(false)
        )}
        ref={ref}
      />
    );
  });
