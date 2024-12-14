/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { MutableRefObject, ReactNode } from 'react';
import type { ButtonProps } from '../../buttons/Button';
import type {
  LayoutRectangle,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import type { UseFloatingReturn } from '@floating-ui/react';

export type Value = string | string[];

export type Context = {
  multiple?: boolean;
  searchable?: boolean;
  open: boolean;
  setOpen: (_p: boolean) => void;
  value: Value;
  setValue: (_p: Value) => void;
  variant?: ButtonProps['variant'];
  triggerLayout: MutableRefObject<LayoutRectangle | undefined>;
  sheet?: MutableRefObject<BottomSheetMethods | undefined>;
  adapt?: boolean;
  onFocus?: (_e: NativeSyntheticEvent<TargetedEvent>) => void;
  onBlur?: (_e: NativeSyntheticEvent<TargetedEvent>) => void;
  id?: string;
  // hover?: boolean;
  // focus: boolean;
  refs: UseFloatingReturn['refs'];
  floatingStyles: UseFloatingReturn['floatingStyles'];

  label?: string;
  description?: string;
  extra?: string;
  clearable?: boolean;
  error: string;

  items: Item[];

  renderValue?: (_item: Value) => ReactNode;
};

export type Item = {
  value: string | number;
  label: ReactNode;
  search?: string | number;
};

export const [SelectProvider, useSelectProvider] = createScope<Context>(
  {} as Context
);
