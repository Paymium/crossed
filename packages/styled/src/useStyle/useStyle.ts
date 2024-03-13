/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '../Registry';
import type { UseStyle } from './types';
import type { CrossedstyleValues } from '../types';
import { useWindowDimensions } from 'react-native';
import { composeEventHandlers } from '@crossed/core';
import { useCallback, useMemo, useState, useTransition } from 'react';
import { Platform } from 'react-native';

export const useStyle: UseStyle = (params, props = {}) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [, setTransition] = useTransition();
  const onPressIn = useCallback(
    composeEventHandlers(props.onPressIn, () => {
      setTransition(() => {
        setActive(true);
      });
    }),
    [setActive, props.onPressIn]
  );
  const onPressOut = useCallback(
    composeEventHandlers(props.onPressOut, () => {
      setTransition(() => {
        setActive(false);
      });
    }),
    [setActive, props.onPressOut]
  );

  const onHoverIn = useCallback(
    composeEventHandlers(props.onHoverIn, () => {
      setTransition(() => {
        setHover(true);
      });
    }),
    [setHover, props.onHoverIn]
  );
  const onHoverOut = useCallback(
    composeEventHandlers(props.onHoverOut, () => {
      setTransition(() => {
        setHover(false);
      });
    }),
    [setHover, props.onHoverOut]
  );
  const { width } = useWindowDimensions();
  const { style, className } = useMemo(() => {
    const style: CrossedstyleValues[] = [];
    if (params) {
      Registry.apply(params, {
        isWeb: Platform.OS === 'web',
        addClassname: ({ body }) => style.push(...Object.values(body)),
        props: {
          ...props,
          active: props.active ?? active,
          hover: props.hover ?? hover,
        },
      });
    }
    return {
      className: ``,
      style: [
        ...style,
        ...(Array.isArray(props?.style) ? props?.style : [props?.style]),
      ],
    };
  }, [params, props, active, hover, width]);
  return {
    style,
    className,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    theme: Registry.getTheme(),
  };
};
