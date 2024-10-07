/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';
import { Orientation, createCollection } from '@crossed/primitive';
import { createContext } from 'react';
import { ButtonProps } from './types';

export type ContextButton = {
  id: string;
};

export const [Provider, useContext] = createScope<ContextButton>(
  {} as ContextButton
);

export const buttonContext = createContext<
  Pick<ButtonProps, 'variant' | 'error' | 'disabled'> & {
    state?: {
      active?: boolean;
      hover?: boolean;
    };
  }
>({});

type ButtonGroupContext = {
  orientation: Orientation;
  grouped?: boolean;
};
export const [ProviderGroup, useContextGroup] = createScope<ButtonGroupContext>(
  { orientation: 'horizontal' } as ButtonGroupContext
);

const GROUP_NAME = 'ButtonGroup';

type ItemData = { id: string };
const [ButtonGroupCollection, useButtonGroupCollection] = createCollection<
  HTMLSpanElement,
  ItemData
>(GROUP_NAME);

export const {
  ItemSlot: ButtonGroupCollectionItemSlot,
  Provider: ButtonGroupCollectionProvider,
  Slot: ButtonGroupCollectionSlot,
} = ButtonGroupCollection;

export { ButtonGroupCollection, useButtonGroupCollection };
