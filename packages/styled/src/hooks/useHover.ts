import { composeEventHandlers } from '@crossed/core';
import { useSignal } from '@preact/signals-react';

export const useHover = <
  T extends {
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

  return {
    hovered,
    actions: {
      onPointerEnter: onPointerEnter,
      onPointerLeave: onPointerLeave,
    },
  };
};
