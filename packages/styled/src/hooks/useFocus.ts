import { composeEventHandlers } from '@crossed/core';
import { useSignal } from '@preact/signals-react';

export const useFocus = <
  T extends {
    onFocus?: (..._args: any[]) => void;
    onBlur?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const focus = useSignal(false);
  const onFocus = composeEventHandlers(() => {
    focus.value = true;
  }, props.onFocus) as any;
  const onBlur = composeEventHandlers(() => {
    focus.value = false;
  }, props.onBlur) as any;

  return { focus, actions: { onFocus, onBlur } };
};
