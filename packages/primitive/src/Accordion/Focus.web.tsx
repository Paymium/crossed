/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { View } from 'react-native';
import type { FocusComponent, OnKeyDown, UseFocus } from './types';
import ReactFocusLock, { useFocusScope } from 'react-focus-lock';
import { useCallback } from 'react';

export const Focus: FocusComponent = ({ children, ...props }) => {
  return (
    <ReactFocusLock lockProps={props} disabled as={View as any}>
      {children}
    </ReactFocusLock>
  );
};

export const useFocus: UseFocus = ({ onPress }) => {
  const { focusNext, focusPrev } = useFocusScope();
  const onKey: OnKeyDown = useCallback(
    (event) => {
      if (event.code === 'ArrowDown') {
        focusNext();
        event.stopPropagation();
        event.preventDefault();
      }
      if (event.code === 'ArrowUp') {
        event.stopPropagation();
        event.preventDefault();
        focusPrev();
      }
      if (event.code === 'Space') {
        onPress();
        event.stopPropagation();
        event.preventDefault();
      }
    },
    [focusNext, focusPrev, onPress]
  );
  return { onKeyDown: onKey };
};
