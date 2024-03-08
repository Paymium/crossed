/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import * as React from 'react';
import { Registry } from '../Registry';
import type { UseStyle } from './types';

export const useStyle: UseStyle = (params, props) => {
  const [active, setActive] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [, setTransition] = React.useTransition();
  const onPressIn = React.useCallback(() => {
    setTransition(() => {
      setActive(true);
    });
  }, [setActive]);
  const onPressOut = React.useCallback(() => {
    setTransition(() => {
      setActive(false);
    });
  }, [setActive]);

  const onHoverIn = React.useCallback(() => {
    setTransition(() => {
      setHover(true);
    });
  }, [setHover]);
  const onHoverOut = React.useCallback(() => {
    setTransition(() => {
      setHover(false);
    });
  }, [setHover]);
  return React.useMemo(
    function MemoUseStyle() {
      // const { style } = parse(params?.() || {});
      // const style = {};
      return {
        className: ``,
        style: [
          // style.base,
          // active && style.hover,
          // active && style.active,
          props?.style,
        ],
        onPressIn,
        onPressOut,
        onHoverIn,
        onHoverOut,
        theme: Registry.getTheme(),
      };
    },
    [params, props?.style, active, hover]
  );
};
