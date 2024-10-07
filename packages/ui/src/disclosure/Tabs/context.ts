/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import { ScrollView } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

export type TabsContext = {
  value: string | number;
  setValue: (_value: string | number) => void;
  id: string;
  variant?: 'underline' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  listTabRef: React.MutableRefObject<ScrollView>;
  indicator: { left: SharedValue<number>; width: SharedValue<number> };
  scroll: SharedValue<number>;
  shouldShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  widthLayout: SharedValue<number>;
};

export type TriggerContext = {
  disabled?: boolean;
  hover?: boolean;
  selected?: boolean;
};

export const createContext = () => {
  return {
    tabsContext: createScope<TabsContext>({
      variant: 'rounded',
    } as TabsContext),
    triggerContext: createScope<TriggerContext>({}),
  };
};
