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
  | 'onBlur';
export const useInteraction = (
  props?: Pick<PressableProps, PropsOverWrite> & {
    active?: boolean;
    hover?: boolean;
    focus?: boolean;
  }
) => {
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
        setActive(true);
      });
    }),
    [setActive, props?.onPressIn]
  );
  const onPressOut = useCallback(
    composeEventHandlers(props?.onPressOut || undefined, () => {
      setTransition(() => {
        setActive(false);
      });
    }),
    [setActive, props?.onPressOut]
  );

  const onHoverIn = useCallback(
    composeEventHandlers(props?.onHoverIn || undefined, () => {
      setTransition(() => {
        setHover(true);
      });
    }),
    [setHover, props?.onHoverIn]
  );
  const onHoverOut = useCallback(
    composeEventHandlers(props?.onHoverOut || undefined, () => {
      setTransition(() => {
        setHover(false);
      });
    }),
    [setHover, props?.onHoverOut]
  );
  const onFocus = useCallback(
    composeEventHandlers(props?.onFocus || undefined, () => {
      setTransition(() => {
        setFocus(true);
      });
    }),
    [setFocus, props?.onFocus]
  );
  const onBlur = useCallback(
    composeEventHandlers(props?.onBlur || undefined, () => {
      setTransition(() => {
        setFocus(false);
      });
    }),
    [setFocus, props?.onBlur]
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
