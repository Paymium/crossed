/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, type PressableProps } from 'react-native';
import { Slot, type SlotProps } from '../../Slot';
import { useFloatingContext } from './context';
import { useCallback } from 'react';
import { composeEventHandlers } from '@crossed/core';

export const FloatingTrigger = (
  props: Omit<SlotProps<PressableProps>, 'Comp'>
) => {
  const { open, onClose, onOpen } = useFloatingContext();
  const toggle = useCallback(() => {
    if (open) onClose();
    else onOpen();
  }, [open, onClose, onOpen]);
  return (
    <Slot
      Comp={Pressable}
      {...props}
      onPress={composeEventHandlers(toggle, props.onPress)}
    />
  );
};
FloatingTrigger.displayName = 'Floating.Trigger';
