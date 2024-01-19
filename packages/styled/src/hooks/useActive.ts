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

export const useActive = <
  T extends {
    active?: boolean;
    onPointerUp?: (..._args: any[]) => void;
    onPointerDown?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const active = useSignal(false);
  const onPointerUp = composeEventHandlers(() => {
    active.value = false;
  }, props.onPointerUp);
  const onPointerDown = composeEventHandlers(() => {
    active.value = true;
  }, props.onPointerDown);

  useEffect(() => {
    if (props.active !== undefined && active.value !== props.active) {
      active.value = props.active;
    }
  }, [props.active]);

  return {
    active,
    actions: {
      onPointerUp,
      onPointerDown,
    },
  };
};
