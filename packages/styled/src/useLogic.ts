import { useMemo } from 'react';
import { useStyles } from 'react-native-unistyles';
import type { ReturnExtract } from './extract';
import { useActive } from './hooks/useActive';
import { useHover } from './hooks/useHover';
import { useFocus } from './hooks/useFocus';

export const useLogic = <P extends Record<string, any>>({
  props,
  // debug,
  styleSheet,
  hovered: hoveredProps,
  active: activeProps,
  focus: focusProps,
}: {
  props: P;
  styleSheet: (e: never) => ReturnExtract;
  hovered?: boolean;
  active?: boolean;
  focus?: boolean;
  debug?: boolean;
}) => {
  const { styles } = useStyles(styleSheet as any, props as any);

  const { hovered, ...actionsHover } = useHover(props);
  const { active, ...actionsPressed } = useActive(props);
  const { focus, ...actionsFocus } = useFocus(props);

  const globalStyle = useMemo(() => {
    const hoverStyle = (hoveredProps || hovered) && styles.hover;
    const focusStyle = (focusProps || focus) && styles.focus;
    const activeStyle = (activeProps || active) && styles.active;
    const extraStyle =
      styles.base.extraStyle?.(props, {
        focus: focus || focusProps,
        active: active || activeProps,
        hover: hovered || hoveredProps,
      }) || {};

    return [
      Object.keys(styles.base).length > 0 ? styles.base : undefined,
      focusStyle && Object.keys(focusStyle).length > 0 ? focusStyle : undefined,
      hoverStyle && Object.keys(hoverStyle).length > 0 ? hoverStyle : undefined,
      activeStyle && Object.keys(activeStyle).length > 0
        ? activeStyle
        : undefined,
      extraStyle && Object.keys(extraStyle).length > 0 ? extraStyle : undefined,
      ...(Array.isArray(props.style) ? props.style : [props.style]),
    ];
  }, [
    props,
    styles,
    hovered,
    hoveredProps,
    active,
    activeProps,
    focus,
    focusProps,
  ]);

  return {
    styles: globalStyle,
    actions: {
      ...actionsPressed,
      ...actionsHover,
      ...actionsFocus,
    },
  };
};
