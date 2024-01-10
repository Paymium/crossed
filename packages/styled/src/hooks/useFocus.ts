import { composeEventHandlers } from '@crossed/core';
import { useCallback, useState } from 'react';

export const useFocus = <
  T extends {
    onFocus?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
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
