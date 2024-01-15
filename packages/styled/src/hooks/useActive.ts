import { composeEventHandlers } from '@crossed/core';
import { useSignal } from '@preact/signals-react';

export const useActive = <
  T extends {
    onPointerUp?: (..._args: any[]) => void;
    onPointerDown?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const active = useSignal(false);
  const onPointerUp = composeEventHandlers(() => {
    active.value = false;
  }, props.onPointerUp);
  const onPointerDown = composeEventHandlers(() => {
    active.value = true;
  }, props.onPointerDown);

  return {
    active,
    actions: {
      onPointerUp,
      onPointerDown,
    },
  };
};
