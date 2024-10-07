/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useCallback } from 'react';
import { Pressable, type PressableProps, type View } from 'react-native';
import { useSheetContext } from './context';
import { composeEventHandlers } from '@crossed/core';
import { Slot } from '../../Slot';

export type TriggerProps = PressableProps & {
  /**
   * Send logic and propr to children
   */
  asChild?: boolean;
};

export const Trigger = forwardRef<View, TriggerProps>(
  (props: TriggerProps, ref) => {
    const { open, setOpen } = useSheetContext();
    const onPress = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);
    return (
      <Slot
        Comp={Pressable}
        ref={ref}
        role="button"
        {...props}
        onPress={composeEventHandlers(props.onPress, onPress)}
      />
    );
  }
);
