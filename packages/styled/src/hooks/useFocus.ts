/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { composeEventHandlers } from '@crossed/core';
import { useSignal } from '@preact/signals-react';
import { useEffect } from 'react';

export const useFocus = <
  T extends {
    focus?: boolean;
    onFocus?: (..._args: any[]) => void;
    onBlur?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const focus = useSignal(false);
  const onFocus = composeEventHandlers(() => {
    focus.value = true;
  }, props.onFocus) as any;
  const onBlur = composeEventHandlers(() => {
    focus.value = false;
  }, props.onBlur) as any;

  useEffect(() => {
    if (props.focus !== undefined && focus.value !== props.focus) {
      focus.value = props.focus;
    }
  }, [props.focus]);

  return { focus: focus, actions: { onFocus, onBlur } };
};
