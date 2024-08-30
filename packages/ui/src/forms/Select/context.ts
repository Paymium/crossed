/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { MutableRefObject, ReactNode } from 'react';
import type { ButtonProps } from '../Button';
import type {
  LayoutRectangle,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';
import type { UseFloatingReturn } from '@floating-ui/react';

export type Context = {
  open: boolean;
  setOpen: (_p: boolean) => void;
  value: string;
  setValue: (_p: string) => void;
  renderValue: MutableRefObject<ReactNode>;
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
};

export const [SelectProvider, useSelectProvider] = createScope<Context>(
  {} as Context
);
