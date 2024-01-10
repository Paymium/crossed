import { composeEventHandlers } from '@crossed/core';
import { useCallback, useState } from 'react';

export const useActive = <
  T extends {
    onPointerUp?: (...args: any[]) => void;
    onPointerDown?: (...args: any[]) => void;
  }
>(
  props: T
) => {
  const [active, setActive] = useState(false);
  // active
  const onPointerUp = useCallback(
    composeEventHandlers(() => {
      setActive(false);
    }, props.onPointerUp) as any,
    []
  );
  const onPointerDown = useCallback(
    composeEventHandlers(() => {
      setActive(true);
    }, props.onPointerDown) as any,
    []
  );
  return {
    active,
    onPointerUp,
    onPointerDown,
  };
};
