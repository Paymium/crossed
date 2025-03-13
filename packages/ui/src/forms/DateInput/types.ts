/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ReferenceType, useFloating } from '@floating-ui/react';
import { ReactFocusOnProps } from 'react-focus-on/dist/es5/types';
import { ComponentType } from 'react';
import { CalendarProps } from './Calendar';
import { FloatingProps } from '../../overlay/Floating/Root';

export type FormatYear = 'yyyy';
export type FormatMonth = 'mm';
export type FormatDay = 'dd';

export type FocusProps = ReactFocusOnProps;
export type FocusComponent = ComponentType<FocusProps>;

export interface Value {
  day: number;
  month: number;
  year: number;
}

export type Format =
  | FormatYear
  | FormatMonth
  | FormatDay
  | `${FormatYear}-${FormatMonth}`
  | `${FormatMonth}-${FormatDay}`
  | `${FormatYear}-${FormatMonth}-${FormatDay}`;

export type UseFloating<T extends ReferenceType = ReferenceType> =
  typeof useFloating<T>;

export interface DateInputProps
  extends Partial<
    Omit<CalendarProps, 'floatingStyles' | 'setFloating' | 'onDateSelected'>
  > {
  value?: Date;
  onChange?: (_param: Date) => void;
  format?: Format;
  picker?: boolean;
  placeholder?: { day?: string; month?: string; year?: string };
  /**
   * Floating props
   */
  floatingProps?: Partial<FloatingProps>;
  id?: string;
}
