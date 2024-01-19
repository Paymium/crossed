/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers } from '@crossed/core';
import { useComputed, useSignal } from '@preact/signals-react';

export const useHover = <
  T extends {
    hovered?: boolean;
    onPointerEnter?: (..._args: any[]) => void;
    onPointerLeave?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const hovered = useSignal(false);
  const onPointerEnter = composeEventHandlers(() => {
    hovered.value = true;
  }, props.onPointerEnter);
  const onPointerLeave = composeEventHandlers(() => {
    hovered.value = false;
  }, props.onPointerLeave);

  const isHover = useComputed(() => {
    return props.hovered || hovered.value;
  });

  return {
    hovered: isHover,
    actions: {
      onPointerEnter: onPointerEnter,
      onPointerLeave: onPointerLeave,
    },
  };
};
