import { useContext } from './context';
import { ComponentType, forwardRef } from 'react';
import { composeEventHandlers } from '@crossed/core';

export const createLabelText = <P,>(StyledText: ComponentType<P>) =>
  forwardRef<any, Omit<P, 'children'> & { children: string }>((props, ref) => {
    const { id, inputRef } = useContext();
    return (
      <StyledText
        ref={ref}
        id={`label-${id}`}
        role="label"
        {...(props as any)}
        onPress={composeEventHandlers((props as any).onPress, () => {
          inputRef?.current?.focus?.();
        })}
      />
    );
  });
