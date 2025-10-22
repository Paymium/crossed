/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo } from 'react';
import { Sheet } from '../../overlay/Sheet';
import { YBox } from '../../layout/YBox';
import { Text } from '../../typography/Text';
import { FormField } from '../../forms/Form';
import { SelectLabel } from './Label';
import { SelectConfigProvider, SelectValueProvider } from './context';
import { useUncontrolled } from '@crossed/core';
import { SelectProps } from './types';
import { SelectTrigger } from './Trigger';
import { SelectContent } from './Content';
import { useFloating } from './useFloating';
import { Floating } from '../../overlay/Floating';
import { isWeb } from '@crossed/styled';
import { useMedia } from '../../useMedia';

export const Select = memo<SelectProps>((e) => {
  const {
    label,
    error,
    helperText,
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
    section,
  } = e;

  const { md } = useMedia();
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
      section={section}
      showSheet={!isWeb || !md}
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
                <SelectLabel label={label} />
                <SelectTrigger
                  ref={refs.setReference as any}
                  id={id}
                  disabled={disabled}
                >
                  {children}
                </SelectTrigger>
                {!!helperText && (
                  <Text fontSize={'sm'} color={'tertiary'}>
                    {helperText}
                  </Text>
                )}
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
