/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope, useUncontrolled } from '@crossed/core';
import { Item, ValueType, ValueTypeMultiple } from './types';
import type { UseFloatingReturn } from '@floating-ui/react';
import { ReactNode } from 'react';

/**
 * Config context
 * contains all boolean activation
 */
export type SelectConfigContext = {
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  disabled?: boolean;
};

export const [SelectConfigProvider, useSelectConfig] =
  createScope<SelectConfigContext>({} as SelectConfigContext);

/**
 * Value context
 * contains value and method change value
 */
type UseUncontrolled = typeof useUncontrolled<ValueType | ValueTypeMultiple>;
export type SelectValueContext = {
  value: ReturnType<UseUncontrolled>[0];
  setValue: ReturnType<UseUncontrolled>[1];
  items: Item[];
  renderValue?: (_value: ValueType) => ReactNode;
};

export const [SelectValueProvider, useSelectValue] =
  createScope<SelectValueContext>({} as SelectValueContext);

/**
 * Floating context
 * contains value and method change value
 */
export type SelectFloatingRefsContext = {
  refs: UseFloatingReturn['refs'];
};
export const [SelectFloatingRefsProvider, useSelectFloatingRefs] =
  createScope<SelectFloatingRefsContext>({} as SelectFloatingRefsContext);
export type SelectFloatingStylesContext = {
  floatingStyles: UseFloatingReturn['floatingStyles'];
};

export const [SelectFloatingStylesProvider, useSelectFloatingStyles] =
  createScope<SelectFloatingStylesContext>({} as SelectFloatingStylesContext);
