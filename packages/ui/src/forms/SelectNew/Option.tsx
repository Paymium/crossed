/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { RovingFocusGroupItem } from '@crossed/primitive';
import { MenuList } from '../../display/MenuList';
import { Floating } from '../../overlay/Floating';
import { useSelectContext } from './context';
import { forwardRef, PropsWithChildren } from 'react';
import { View } from 'react-native';

export type SelectOptionProps = PropsWithChildren<{
  value: string;
}>;

export const SelectOption = forwardRef<View, SelectOptionProps>(
  ({ children, value }, ref) => {
    const { setValue, value: valueSelected, id } = useSelectContext();
    const selected = valueSelected === value;

    return (
      <RovingFocusGroupItem asChild>
        <Floating.Trigger
          asChild
          onPress={() => {
            setValue(value);
          }}
        >
          <MenuList.Item
            ref={ref}
            role="option"
            aria-selected={selected}
            id={`${id}-${value}`}
          >
            <MenuList.Title>{children}</MenuList.Title>
          </MenuList.Item>
        </Floating.Trigger>
      </RovingFocusGroupItem>
    );
  }
);

SelectOption.displayName = 'Select.Option';
