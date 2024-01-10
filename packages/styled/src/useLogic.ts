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
    return [
      styles.base,
      (focus || focusProps) && styles.focus,
      (hovered || hoveredProps) && styles.hover,
      (active || activeProps) && styles.active,
      styles.base.extraStyle?.(props, {
        focus: focus || focusProps,
        active: active || activeProps,
        hover: hovered || hoveredProps,
      }),
      props.style,
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
