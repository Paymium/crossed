/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Pressable, type View, type PressableProps } from 'react-native';
import { Slot, type SlotProps } from '../../Slot';
import { useFloatingConfig, useFloatingContext } from './context';
import { forwardRef, memo, RefAttributes, useCallback, useMemo } from 'react';
import { composeEventHandlers } from '@crossed/core';
import { composeStyles, CrossedMethods } from '@crossed/styled';

export type FloatingTriggerProps = Omit<
  SlotProps<PressableProps>,
  'Comp' | 'style'
> & {
  /**
   * Crossed style
   */
  style?: CrossedMethods<any>;
};

export const FloatingTrigger = memo<FloatingTriggerProps & RefAttributes<View>>(
  forwardRef<View, FloatingTriggerProps>(({ style, ...props }, ref) => {
    const { triggerStrategy, enabled } = useFloatingConfig();
    const { open, onClose, onOpen } = useFloatingContext();

    const toggle = useCallback(() => {
      if (open) onClose();
      else onOpen();
    }, [open, onClose, onOpen]);

    const propsExtended = useMemo(() => {
      const eventStrategiy = !enabled
        ? {}
        : triggerStrategy === 'onPress'
          ? {
              onPress: composeEventHandlers(toggle, props.onPress),
            }
          : {
              onPointerEnter: composeEventHandlers(
                onOpen,
                props.onPointerEnter
              ),
              onPointerLeave: composeEventHandlers(
                onClose,
                props.onPointerLeave
              ),
            };
      return {
        ...props,
        ...style?.rnw(),
        ...eventStrategiy,
      };
    }, [props, toggle, enabled, onClose, onOpen]);

    return (
      <Slot
        ref={ref}
        Comp={Pressable}
        role="button"
        {...propsExtended}
        {...composeStyles(propsExtended.style).style()}
      />
    );
  })
);
FloatingTrigger.displayName = 'Floating.Trigger';
