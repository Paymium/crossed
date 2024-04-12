/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import type { MutableRefObject, ReactNode } from 'react';
import type { ButtonProps } from '../Button';
import type { LayoutRectangle } from 'react-native';
import type { BottomSheetMethods } from '@devvie/bottom-sheet';

export type Context = {
  open: boolean;
  setOpen: (_p: boolean) => void;
  value: string | number;
  setValue: (_p: string | number) => void;
  renderValue: MutableRefObject<ReactNode>;
  variant?: ButtonProps['variant'];
  triggerLayout: MutableRefObject<LayoutRectangle | undefined>;
  sheet?: MutableRefObject<BottomSheetMethods | undefined>;
  adapt?: boolean;
};

export const [SelectProvider, useSelectProvider] = createScope<Context>(
  {} as Context
);
