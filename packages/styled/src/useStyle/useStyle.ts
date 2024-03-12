/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { UseStyle } from './types';
import type { CrossedstyleValues } from '../types';
// import { useWindowDimensions } from 'react-native';
import { composeEventHandlers } from '@crossed/core';

export const useStyle: UseStyle = (params, props = {}) => {
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [, setTransition] = React.useTransition();
  const onPressIn = React.useCallback(() => {
    setTransition(() => {
      setActive(true);
    });
  }, [setActive]);
  const onPressOut = React.useCallback(
    composeEventHandlers(props.onPressOut, () => {
      setTransition(() => {
        setActive(false);
      });
    }),
    [setActive, props.onPressOut]
  );

  const onHoverIn = React.useCallback(
    composeEventHandlers(props.onHoverIn, () => {
      setTransition(() => {
        setHover(true);
      });
    }),
    [setHover, props.onHoverIn]
  );
  const onHoverOut = React.useCallback(
    composeEventHandlers(props.onHoverOut, () => {
      setTransition(() => {
        setHover(false);
      });
    }),
    [setHover, props.onHoverOut]
  );
  // const { width } = useWindowDimensions();
  const { style, className } = React.useMemo(
    function MemoUseStyle() {
      const style: CrossedstyleValues[] = [];
      if (params) {
        Object.entries(params()).forEach(
          ([key, styles]: [string, CrossedstyleValues]) => {
            Registry.getPlugins().forEach(({ test, apply }) => {
              const keyFind = key.match(new RegExp(test, 'g'));
              if (test && keyFind && keyFind.length > 0) {
                apply({
                  props: {
                    ...props,
                    active: props.active ?? active,
                    hover: props.hover ?? hover,
                  },
                  key,
                  styles,
                  addClassname: ({ body }) => {
                    style.push(...Object.values(body));
                  },
                });
              }
            });
          }
        );
      }
      return {
        className: ``,
        style: [
          ...style,
          // style.base,
          // active && style.hover,
          // active && style.active,
          props?.style,
        ],
      };
    },
    [params, props, active, hover]
  );
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
