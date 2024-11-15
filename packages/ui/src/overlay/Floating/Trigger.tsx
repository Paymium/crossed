/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, type View, type PressableProps } from 'react-native';
import { Slot, type SlotProps } from '../../Slot';
import { useFloatingContext } from './context';
import { memo, Ref, useCallback } from 'react';
import { composeEventHandlers } from '@crossed/core';
import { CrossedMethods } from '@crossed/styled';

export type FloatingTriggerProps = Omit<SlotProps<PressableProps>, 'Comp'> & {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;

  /**
   * Element ref
   */
  ref?: Ref<View>;
};

export const FloatingTrigger = memo<FloatingTriggerProps>(
  ({ style, ...props }: FloatingTriggerProps) => {
    const { open, onClose, onOpen } = useFloatingContext();
    const toggle = useCallback(() => {
      if (open) onClose();
      else onOpen();
    }, [open, onClose, onOpen]);
    return (
      <Slot
        ref={props.ref}
        Comp={Pressable}
        role="button"
        {...props}
        {...style?.rnw()}
        onPress={composeEventHandlers(props.onPress, toggle)}
      />
    );
  }
);
FloatingTrigger.displayName = 'Floating.Trigger';
