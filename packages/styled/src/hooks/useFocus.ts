import { composeEventHandlers } from '@crossed/core';
import { useComputed, useSignal } from '@preact/signals-react';

export const useFocus = <
  T extends {
    focus?: boolean;
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

  const isFocus = useComputed(() => {
    return props.focus || focus.value;
  });

  return { focus: isFocus, actions: { onFocus, onBlur } };
};
