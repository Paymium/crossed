/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TabsContext } from './context';
import { useId, useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { useUncontrolled, UseUncontrolledInput } from '@crossed/core';

export type Instance = TabsContext;

export const useTabs = (
  state?: UseUncontrolledInput<TabsContext['value']>
): Instance => {
  const [value, setValue] = useUncontrolled<TabsContext['value']>(state);
  const listTabRef = useRef<ScrollView>(null);
  const left = useSharedValue(0);
  const width = useSharedValue(0);
  const scroll = useSharedValue(0);
  const widthLayout = useSharedValue(0);
  const id = useId();

  const [shouldShow, setShow] = useState(false);
  return {
    listTabRef,
    value,
    setValue,
    indicator: { left, width },
    scroll,
    widthLayout,
    id,
    shouldShow,
    setShow,
  };
};
