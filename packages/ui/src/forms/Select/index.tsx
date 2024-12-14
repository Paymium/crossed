/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback, useRef } from 'react';
import { YBox } from '../../layout';
import { FormField } from '../Form';
import { Text } from '../../typography';
import { Floating, Sheet } from '../../overlay';
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
import { ActionSheetRef } from 'react-native-actions-sheet';

export type SelectProps = Pick<
  SelectLabelProps,
  'label' | 'description' | 'extra'
> &
  Pick<SelectConfigContext, 'multiple' | 'clearable' | 'searchable'> &
  Partial<Pick<UseUncontrolledInput<ValueType>, 'defaultValue' | 'onChange'>> &
  Pick<SelectValueContext, 'items'> &
  Partial<Pick<SelectValueContext, 'value'>> & {
    error?: string;
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
    >
      <SelectValueProvider value={value} setValue={setValue} items={items}>
        <Floating removeScroll={false}>
          <Sheet>
            <FormField>
              <YBox space="xxs">
                <SelectLabel
                  label={label}
                  description={description}
                  extra={extra}
                />
                <SelectTrigger ref={refs.setReference as any} />
                {!!error && <Text color="error">{error.toString()}</Text>}
              </YBox>
              <SelectContent
                ref={refs.setFloating as any}
                floatingStyles={floatingStyles}
              />
            </FormField>
          </Sheet>
        </Floating>
      </SelectValueProvider>
    </SelectConfigProvider>
  );
});
