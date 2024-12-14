/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType, ReactNode } from 'react';
import { ReferenceType, useFloating } from '@floating-ui/react';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';

export type ValueType = string | number[];
export type ValueTypeMultiple = ValueType[];

export type Item = {
  value: ValueType;
  label: ReactNode;
  search?: ValueType;
};

export type UseFloating<T extends ReferenceType = ReferenceType> =
  typeof useFloating<T>;

export type FocusProps = ReactFocusOnProps;
export type FocusComponent = ComponentType<FocusProps>;
