import { useContext } from './context';
import { ComponentType, forwardRef } from 'react';
import type { RequiredAccessibilityProps } from 'src/types';
import { composeEventHandlers } from '@crossed/core';
import { Platform } from 'react-native';

export const createLabelText = <P,>(StyledText: ComponentType<P>) =>
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { id, inputRef } = useContext();
    return (
      <StyledText
        ref={ref}
        id={`label-${id}`}
        {...(props as any)}
        {...(Platform.OS === 'web'
          ? {
              for: id,
            }
          : {})}
        onPress={composeEventHandlers((props as any).onPress, () => {
          inputRef?.current?.focus?.();
        })}
      />
    );
  });
