import { composeEventHandlers } from '@crossed/core';
import { useCallback, useState } from 'react';

export const useHover = <
  T extends {
    onPointerEnter?: (..._args: any[]) => void;
    onPointerLeave?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const [hovered, setHoveredState] = useState(false);
  const onPointerEnter = useCallback(
    composeEventHandlers(() => {
      setHoveredState(true);
    }, props.onPointerEnter) as any,
    [props.onPointerEnter, setHoveredState]
  );
  const onPointerLeave = useCallback(
    composeEventHandlers(() => {
      setHoveredState(false);
    }, props.onPointerLeave) as any,
    [props.onPointerLeave, setHoveredState]
  );

  return {
    hovered,
    onPointerLeave,
    onPointerEnter,
  };
};
