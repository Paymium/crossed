import { Platform } from 'react-native';
import { useContext } from './context';
import { ComponentType, forwardRef } from 'react';
import type { RequiredAccessibilityProps } from 'src/types';

export const createLabelText = <P,>(StyledText: ComponentType<P>) =>
  // @ts-ignore
  forwardRef<any, RequiredAccessibilityProps<P, 'aria-label'>>((props, ref) => {
    const { id, inputRef } = useContext();
    return (
      <StyledText
        {...(Platform.OS === 'web'
          ? { for: id }
          : {
              onPress: () => {
                inputRef?.current?.focus?.();
              },
            })}
        ref={ref}
        {...(props as any)}
      />
    );
  });
