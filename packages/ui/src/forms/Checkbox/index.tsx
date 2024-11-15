/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { composeStyles, createStyles } from '@crossed/styled';
import { useInteraction } from '@crossed/styled';
import { Check } from '@crossed/unicons';
import { useCallback, useTransition } from 'react';
import { Pressable, View } from 'react-native';
import { Implementation } from './Implementation';
import type { CheckboxComponent } from './type';

const checkboxStyles = createStyles((t) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: t.space.md,
    },
  },
  root: {
    'base': {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderWidth: 1,
      // borderColor: t.colors.neutral[500],
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    ':hover': {
      // borderColor: t.colors.neutral[600],
    },
    ':active': {
      // borderColor: t.colors.neutral[500],
      shadowColor: 'black',
      shadowOpacity: 0.1,
      elevation: 5,
    },
    ':disabled': {
      // backgroundColor: t.colors.neutral[300],
      // borderColor: t.colors.neutral[300],
    },
    'web': {
      ':active': {
        // boxShadow: `0px 0px 0px 2px ${t.colors.neutral[300]}`,
      },
    },
  },
  checked: {
    'base': {
      borderColor: t.colors.primary.primary,
      backgroundColor: t.colors.primary.primary,
    },
    ':active': {
      borderColor: t.colors.primary.primary,
      backgroundColor: t.colors.primary.primary,
    },
  },
}));

export const Checkbox: CheckboxComponent = ({
  children,
  checked: checkedProps,
  defaultChecked = false,
  onChecked,
}) => {
  const [checked, setChecked] = useUncontrolled({
    defaultValue: defaultChecked,
    value: checkedProps,
    onChange: onChecked,
  });
  const { props } = useInteraction();
  const [, setTransition] = useTransition();

  const handlePress = useCallback(() => {
    setTransition(() => {
      setChecked(!checked);
    });
  }, [setChecked, checked, setTransition]);
  return (
    <Pressable
      onPress={handlePress}
      {...props}
      style={({
        pressed,
        hovered,
        focused,
      }: {
        pressed: boolean;
        hovered?: boolean;
        focused?: boolean;
      }) =>
        checkboxStyles.pressable.rnw({
          active: pressed,
          hover: hovered,
          focus: focused,
        }).style
      }
    >
      <Implementation checked={checked} setChecked={setChecked} />
      <View
        {...composeStyles(
          checkboxStyles.root,
          checked && checkboxStyles.checked
        ).rnw()}
      >
        {checked && <Check size={15} color="white" />}
      </View>
      {children}
    </Pressable>
  );
};
Checkbox.displayName = 'Checkbox';
