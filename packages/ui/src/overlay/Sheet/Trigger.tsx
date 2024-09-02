/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { cloneElement, forwardRef, isValidElement, useCallback } from 'react';
import { Pressable, type PressableProps, type View } from 'react-native';
import { useSheetContext } from './context';
import { composeEventHandlers } from '@crossed/core';

export type TriggerProps = PressableProps & { asChild?: boolean };

export const Trigger = forwardRef<View, TriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const { open, setOpen } = useSheetContext();
    const onPress = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        onPress: composeEventHandlers(
          children.props.onPress,
          composeEventHandlers(props.onPress, onPress)
        ),
      } as any);
    }

    return (
      <Pressable
        ref={ref}
        role="button"
        {...props}
        children={children}
        onPress={composeEventHandlers(props.onPress, onPress)}
      />
    );
  }
);
