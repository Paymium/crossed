/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { ComponentType, ReactNode } from 'react';
import { ReferenceType, useFloating } from '@floating-ui/react';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';
import { SelectLabelProps } from './Label';
import { SelectConfigContext, SelectValueContext } from './context';
import { UseUncontrolledInput } from '@crossed/core';

export type ValueType = string | number | (string | number)[];
export type ValueTypeMultiple = ValueType[];

export type ItemList = {
  value: ValueType;
  label: ReactNode;
  search?: ValueType;
};
export type ItemSection = { title: string; data: ItemList[] };

export type Item = ItemList | ItemSection;

export type UseFloating<T extends ReferenceType = ReferenceType> =
  typeof useFloating<T>;

export type FocusProps = ReactFocusOnProps;
export type FocusComponent = ComponentType<FocusProps>;

////////////////////////
// Select Props
////////////////////////

type Base = Pick<SelectLabelProps, 'label' | 'description' | 'extra'> &
  Pick<SelectConfigContext, 'multiple' | 'clearable' | 'searchable'> &
  Partial<Pick<UseUncontrolledInput<ValueType>, 'defaultValue' | 'onChange'>> &
  Pick<SelectValueContext, 'renderValue'> &
  Partial<Pick<SelectValueContext, 'value'>> & {
    error?: string;

    disabled?: boolean;

    id?: string;

    onSearch?: (_search: string) => void;
    loading?: boolean;
    children?: ReactNode;
  };

type SelectSectionProps = Base & {
  items: ItemSection[];
  section: true;
};
type SelectListProps = Base & {
  items: ItemList[];
  section?: never;
};
export type SelectProps = SelectListProps | SelectSectionProps;
