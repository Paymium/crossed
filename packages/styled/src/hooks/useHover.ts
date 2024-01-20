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

export const useHover = <
  T extends {
    hovered?: boolean;
    onPointerEnter?: (..._args: any[]) => void;
    onPointerLeave?: (..._args: any[]) => void;
  }
>(
  props: T
) => {
  const hovered = useSignal(false);
  const onPointerEnter = composeEventHandlers(() => {
    if (props.hovered === undefined || props.hovered === false) {
      hovered.value = true;
    }
  }, props.onPointerEnter);
  const onPointerLeave = composeEventHandlers(() => {
    if (props.hovered === undefined || props.hovered === false) {
      hovered.value = false;
    }
  }, props.onPointerLeave);

  useEffect(() => {
    if (props.hovered !== undefined && hovered.value !== props.hovered) {
      hovered.value = props.hovered;
    }
  }, [props.hovered]);

  return {
    hovered,
    actions: {
      onPointerEnter: onPointerEnter,
      onPointerLeave: onPointerLeave,
    },
  };
};
