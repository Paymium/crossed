/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, type View, type PressableProps } from 'react-native';
import { Slot, type SlotProps } from '../../Slot';
import { useFloatingContext } from './context';
import { forwardRef, memo, useCallback } from 'react';
import { composeEventHandlers } from '@crossed/core';
import { CrossedMethods } from '@crossed/styled';

export const FloatingTrigger = memo(
  forwardRef<
    View,
    Omit<
      SlotProps<
        Omit<PressableProps, 'style'> & { style?: CrossedMethods<any> }
      >,
      'Comp'
    >
  >(({ style, ...props }, ref) => {
    const { open, onClose, onOpen } = useFloatingContext();
    const toggle = useCallback(() => {
      if (open) onClose();
      else onOpen();
    }, [open, onClose, onOpen]);
    return (
      <Slot
        ref={ref}
        Comp={Pressable}
        {...props}
        {...style?.rnw()}
        onPress={composeEventHandlers(props.onPress, toggle)}
      />
    );
  })
);
FloatingTrigger.displayName = 'Floating.Trigger';
