/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { MenuList, MenuListItemProps } from '../../display';
import { useSelectProvider } from './context';
import { useFocusScope } from './Focus';
import { composeStyles, inlineStyle, useTheme } from '@crossed/styled';
import { useCallback } from 'react';
import { XBox } from '../../layout';
import { Checkbox } from '../Checkbox';
import { useSelect } from './styles';
import { composeEventHandlers } from '@crossed/core';

type SelectOptionProps = MenuListItemProps & { value: string };
export const SelectOption = ({
  value,
  children,
  ...props
}: SelectOptionProps) => {
  const {
    setOpen,
    setValue,
    value: valueGlobal,
    multiple,
  } = useSelectProvider();
  const focusProps = useFocusScope();
  const { colors } = useTheme();

  const handleRender = useCallback(
    (e) => {
      const checked =
        value === valueGlobal ||
        (Array.isArray(valueGlobal) && valueGlobal.includes(value));
      return (
        <XBox space={'xxs'}>
          {multiple && <Checkbox checked={checked} onChecked={onPress} />}
          {typeof children === 'function' ? children(e) : children}
        </XBox>
      );
    },
    [colors, children, multiple, valueGlobal, value]
  );
  const onPress = useCallback(() => {
    if (!multiple) setOpen(false);
    if (multiple && Array.isArray(valueGlobal)) {
      setValue(
        valueGlobal.includes(value)
          ? valueGlobal.filter((t) => t !== value)
          : [...valueGlobal, value]
      );
      return;
    }
    setValue(value);
  }, [setOpen, setValue, valueGlobal, multiple, value]);
  return (
    <MenuList.Item
      {...props}
      {...focusProps}
      style={composeStyles(
        useSelect.options,
        value === valueGlobal &&
          inlineStyle(({ colors }) => ({
            base: { backgroundColor: colors.background.active },
            ':hover': { backgroundColor: colors.background.active },
          }))
      )}
      onPress={composeEventHandlers(onPress, props.onPress)}
    >
      {handleRender}
    </MenuList.Item>
  );
};
SelectOption.displayName = 'Select.Option';
