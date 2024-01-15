import type { ReturnExtract } from './extract';
import { useActive } from './hooks/useActive';
import { useHover } from './hooks/useHover';
import { effect, signal } from '@preact/signals-react';
import { useFocus } from './hooks/useFocus';
import { useMemo } from 'react';

export const useLogic = <P extends Record<string, any>>({
  name,
  props,
  debug,
  styles,
  hovered: hoveredProps,
  active: activeProps,
  focus: focusProps,
}: {
  name?: string;
  props: P;
  styles: Partial<ReturnExtract>;
  hovered?: boolean;
  active?: boolean;
  focus?: boolean;
  debug?: boolean;
}) => {
  const log = (...args: any[]) =>
    // eslint-disable-next-line no-console
    console.log(`useLogic - "${name}" -`, ...args);
  const stylesComputed = signal(styles);
  const styleToRender = signal({});

  const { hovered, actions: actionsHover } = useHover(props);
  const { active, actions: actionsActive } = useActive(props);
  const { focus, actions: actionsFocus } = useFocus(props);

  effect(() => {
    const hoverStyle = hovered.value && stylesComputed.value.hover;
    const focusStyle = focus.value && stylesComputed.value.focus;
    const activeStyle = active.value && stylesComputed.value.active;
    const extraStyle =
      (stylesComputed.value.base as any)?.extraStyle?.(props, {
        focus: focus.value || focusProps,
        active: active.value || activeProps,
        hover: hovered.value || hoveredProps,
      }) || {};

    const toto = {
      ...(stylesComputed.value.base &&
      Object.keys(stylesComputed.value.base).length > 0
        ? stylesComputed.value.base
        : undefined),
      ...(focusStyle && Object.keys(focusStyle).length > 0
        ? focusStyle
        : undefined),
      ...(hoverStyle && Object.keys(hoverStyle).length > 0
        ? hoverStyle
        : undefined),
      ...(activeStyle && Object.keys(activeStyle).length > 0
        ? activeStyle
        : undefined),
      ...(extraStyle && Object.keys(extraStyle).length > 0
        ? extraStyle
        : undefined),
      ...(Array.isArray(props.style)
        ? props.style.reduce((acc, t) => ({ ...acc, t }), {})
        : props.style),
    };
    if (JSON.stringify(styleToRender) !== JSON.stringify(toto)) {
      debug &&
        log(
          'reconciliate styles whith state',
          {
            isHover: hovered.value,
            isActive: active.value,
            isFocus: focus.value,
          },
          toto,
          stylesComputed.value
        );
      styleToRender.value = toto;
    }
  });

  debug && log('return value');
  return {
    styles: styleToRender,
    actions: {
      ...actionsActive,
      ...actionsHover,
      ...actionsFocus,
    },
  };
};
