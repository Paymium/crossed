/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, ReactNode } from 'react';
import { Sheet } from '../../overlay/Sheet';
import { YBox } from '../../layout/YBox';
import { Text } from '../../typography/Text';
import { FormField } from '../../forms/Form';
import { SelectLabel, SelectLabelProps } from './Label';
import {
  SelectConfigContext,
  SelectConfigProvider,
  SelectValueContext,
  SelectValueProvider,
} from './context';
import { useUncontrolled, UseUncontrolledInput } from '@crossed/core';
import { ValueType } from './types';
import { SelectTrigger } from './Trigger';
import { SelectContent } from './Content';
import { useFloating } from './useFloating';
import { Floating } from '../../overlay/Floating';

export type SelectProps = Pick<
  SelectLabelProps,
  'label' | 'description' | 'extra'
> &
  Pick<SelectConfigContext, 'multiple' | 'clearable' | 'searchable'> &
  Partial<Pick<UseUncontrolledInput<ValueType>, 'defaultValue' | 'onChange'>> &
  Pick<SelectValueContext, 'items' | 'renderValue'> &
  Partial<Pick<SelectValueContext, 'value'>> & {
    error?: string;

    disabled?: boolean;

    id?: string;

    onSearch?: (_search: string) => void;
    loading?: boolean;
    children?: ReactNode;
  };

export const Select = memo<SelectProps>((e) => {
  const {
    label,
    description,
    extra,
    error,
    multiple,
    clearable,
    searchable,
    value: valueProps,
    onChange,
    defaultValue,
    items,
    disabled,
    id,
    onSearch,
    loading,
    renderValue,
    children,
  } = e;

  const [value, setValue] = useUncontrolled({
    value: valueProps,
    onChange,
    defaultValue,
  });

  const { refs, floatingStyles } = useFloating();

  return (
    <SelectConfigProvider
      multiple={multiple}
      clearable={clearable}
      searchable={searchable}
      disabled={disabled}
    >
      <SelectValueProvider
        value={value}
        setValue={setValue}
        renderValue={renderValue}
        items={items}
      >
        <Floating removeScroll={false}>
          <Sheet>
            <FormField disabled={disabled}>
              <YBox space="xxs">
                <SelectLabel
                  label={label}
                  description={description}
                  extra={extra}
                />
                <SelectTrigger ref={refs.setReference as any} id={id}>
                  {children}
                </SelectTrigger>
                {!!error && <Text color="error">{error.toString()}</Text>}
              </YBox>
              <SelectContent
                ref={refs.setFloating as any}
                floatingStyles={floatingStyles}
                onSearch={onSearch}
                loading={loading}
              />
            </FormField>
          </Sheet>
        </Floating>
      </SelectValueProvider>
    </SelectConfigProvider>
  );
});
