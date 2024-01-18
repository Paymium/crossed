import { composeEventHandlers } from '@crossed/core';
import { useComputed, useSignal } from '@preact/signals-react';

export const useActive = <
  T extends {
    active?: boolean;
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

  const isActive = useComputed(() => {
    return props.active ?? active.value;
  });

  return {
    active: isActive,
    actions: {
      onPointerUp,
      onPointerDown,
    },
  };
};
