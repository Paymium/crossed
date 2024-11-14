/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import { SelectAria } from '@react-aria/select';
import { MutableRefObject, ReactNode } from 'react';
import { LayoutRectangle as RNLayoutRectangle, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
export type LayoutRectangle = RNLayoutRectangle & {
  top?: number;
  left: number;
};
export type SelectContext = {
  value: string;
  setValue: (_p: string) => void;
  layout: SharedValue<LayoutRectangle>;
  refs: { trigger: MutableRefObject<View>; content: MutableRefObject<View> };
  showSheet?: boolean;
  id: string;
  selectedValueRef: ReactNode;
};
export const [SelectProvider, useSelectContext] = createScope<SelectContext>(
  {} as SelectContext
);

export const [SelectAriaProvider, useSelectAriaContext] = createScope<
  SelectAria<object>
>({} as SelectAria<object>);
