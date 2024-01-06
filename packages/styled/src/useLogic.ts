import { composeEventHandlers } from '@crossed/core';
import { useCallback, useMemo, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';
import type { ReturnExtract } from './extract';

const useHover = (props: any) => {
  const [hovered, setHoveredState] = useState(false);
  // hover
  const onPointerEnter = useCallback(
    composeEventHandlers(() => {
      setHoveredState(true);
    }, props.onPointerEnter) as any,
    []
  );
  const onPointerLeave = useCallback(
    composeEventHandlers(() => {
      setHoveredState(false);
    }, props.onPointerLeave) as any,
    []
  );

  return {
    hovered,
    onPointerLeave,
    onPointerEnter,
  };
};

const usePress = (props: any) => {
  const [pressed, setPressedState] = useState(false);
  // active
  const onPointerUp = useCallback(
    composeEventHandlers(() => {
      setPressedState(false);
    }, props.onPointerUp) as any,
    []
  );
  const onPointerDown = useCallback(
    composeEventHandlers(() => {
      setPressedState(true);
    }, props.onPointerDown) as any,
    []
  );
  return {
    pressed,
    onPointerUp,
    onPointerDown,
  };
};

export const useLogic = <P extends Record<string, any>>({
  props,
  styleSheet,
  hovered: hoveredProps,
  pressed: pressedProps,
  animationDuration,
  animationKeys,
}: {
  props: P;
  styleSheet: (e: never) => ReturnExtract;
  hovered?: boolean;
  pressed?: boolean;
  animationDuration?: number;
  animationKeys?: string[];
}) => {
  const { styles } = useStyles(styleSheet as any, props as any);

  const { hovered, ...actionsHover } = useHover(props);
  const { pressed, ...actionsPressed } = usePress(props);

  const styleAnimation = useAnimatedStyle(() => {
    const toto = Object.entries({
      ...styles.base,
      ...(((hovered || hoveredProps) && styles.hover) || {}),
      ...(((pressed || pressedProps) && styles.active) || {}),
    } as any).reduce<any>((acc, [key, value]: any[]) => {
      if ((animationKeys || []).includes(key)) {
        acc[key] = withTiming(value, {
          duration: animationDuration || 100,
        });
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    return toto;
  }, [
    pressedProps,
    hoveredProps,
    pressed,
    hovered,
    styles,
    animationKeys,
    animationDuration,
  ]);

  const globalStyle = useMemo(
    () => [styles.base, styleAnimation, props.style],
    [props.style, styleAnimation, styles]
  );

  return {
    styles: { base: globalStyle },
    actions: {
      ...actionsPressed,
      ...actionsHover,
    },
  };
};
