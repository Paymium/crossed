import { composeEventHandlers } from '@crossed/core';
import { useCallback, useState } from 'react';

export const useFocus = <
  T extends {
    onFocus?: (..._args: any[]) => void;
    onBlur?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const [focus, setFocus] = useState(false);
  const onFocus = useCallback(
    composeEventHandlers(() => {
      setFocus(true);
    }, props.onFocus) as any,
    []
  );
  const onBlur = useCallback(
    composeEventHandlers(() => {
      setFocus(false);
    }, props.onBlur) as any,
    []
  );
  return {
    focus,
    onFocus,
    onBlur,
  };
};
