/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeEventHandlers, useUncontrolled } from '@crossed/core';
import { useCallback, useMemo, useTransition } from 'react';
import type { PressableProps } from 'react-native';

type PropsOverWrite = 'onPressIn' | 'onPressOut' | 'onHoverIn' | 'onHoverOut';
export const useInteraction = (
  props?: Pick<PressableProps, PropsOverWrite> & {
    active?: boolean;
    hover?: boolean;
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
  const [, setTransition] = useTransition();
  const onPressIn = useCallback(
    composeEventHandlers(props?.onPressIn || undefined, () => {
      setTransition(() => {
        if (!active) {
          setActive(true);
        }
      });
    }),
    [active, setActive, props?.onPressIn]
  );
  const onPressOut = useCallback(
    composeEventHandlers(props?.onPressOut || undefined, () => {
      setTransition(() => {
        if (active) {
          setActive(false);
        }
      });
    }),
    [active, setActive, props?.onPressOut]
  );

  const onHoverIn = useCallback(
    composeEventHandlers(props?.onHoverIn || undefined, () => {
      setTransition(() => {
        if (!hover) {
          setHover(true);
        }
      });
    }),
    [hover, setHover, props?.onHoverIn]
  );
  const onHoverOut = useCallback(
    composeEventHandlers(props?.onHoverOut || undefined, () => {
      setTransition(() => {
        if (!hover) {
          setHover(false);
        }
      });
    }),
    [hover, setHover, props?.onHoverOut]
  );

  return useMemo(
    () => ({
      state: { active, hover },
      props: { ...props, onPressIn, onPressOut, onHoverIn, onHoverOut },
    }),
    [props, active, hover, onPressIn, onPressOut, onHoverIn, onHoverOut]
  );
};
