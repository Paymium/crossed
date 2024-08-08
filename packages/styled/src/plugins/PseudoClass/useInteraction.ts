/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { composeEventHandlers, useUncontrolled } from '@crossed/core';
import { useCallback, useMemo, useTransition } from 'react';
import type { PressableProps } from 'react-native';

type PropsOverWrite =
  | 'onPressIn'
  | 'onPressOut'
  | 'onHoverIn'
  | 'onHoverOut'
  | 'onFocus'
  | 'onBlur'
  | 'disabled'
  | 'focusable';
export const useInteraction = (
  props?: Pick<PressableProps, PropsOverWrite> & {
    active?: boolean;
    hover?: boolean;
    focus?: boolean;
  }
) => {
  const { disabled, focusable } = props || {};
  const [active, setActive] = useUncontrolled({
    value: props?.active,
    defaultValue: false,
  });
  const [hover, setHover] = useUncontrolled({
    value: props?.hover,
    defaultValue: false,
  });
  const [focus, setFocus] = useUncontrolled({
    value: props?.focus,
    defaultValue: false,
  });
  const [, setTransition] = useTransition();
  const onPressIn = useCallback(
    composeEventHandlers(props?.onPressIn || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setActive(true);
      });
    }),
    [setActive, props?.onPressIn, disabled, focusable]
  );
  const onPressOut = useCallback(
    composeEventHandlers(props?.onPressOut || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setActive(false);
      });
    }),
    [setActive, props?.onPressOut, disabled, focusable]
  );

  const onHoverIn = useCallback(
    composeEventHandlers(props?.onHoverIn || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setHover(true);
      });
    }),
    [setHover, props?.onHoverIn, disabled, focusable]
  );
  const onHoverOut = useCallback(
    composeEventHandlers(props?.onHoverOut || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setHover(false);
      });
    }),
    [setHover, props?.onHoverOut, disabled, focusable]
  );
  const onFocus = useCallback(
    composeEventHandlers(props?.onFocus || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setFocus(true);
      });
    }),
    [setFocus, props?.onFocus, disabled, focusable]
  );
  const onBlur = useCallback(
    composeEventHandlers(props?.onBlur || undefined, () => {
      setTransition(() => {
        (!disabled || (!focusable && focusable !== undefined)) &&
          setFocus(false);
      });
    }),
    [setFocus, props?.onBlur, disabled, focusable]
  );

  return useMemo(
    () => ({
      state: { active, hover, focus },
      props: {
        ...props,
        onPressIn,
        onPressOut,
        onHoverIn,
        onHoverOut,
        onBlur,
        onFocus,
      },
    }),
    [
      props,
      active,
      hover,
      focus,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onBlur,
      onFocus,
    ]
  );
};
