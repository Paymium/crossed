/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { createStyles } from '@crossed/styled';
import { useInteraction } from '@crossed/styled/plugins';
import { Check } from '@crossed/unicons';
import { useCallback, useTransition, type PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

const checkboxStyles = createStyles((t) => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
  },
  root: {
    'base': {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#AEB6CE',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    ':hover': { borderColor: '#5D607C' },
    ':active': {
      borderColor: '#AEB6CE',
      shadowColor: 'black',
      shadowOpacity: 0.1,
      elevation: 5,
    },
    ':disabled': { backgroundColor: '#EBEAFE', borderColor: '#EBEAFE' },
    'variants': {
      checked: {
        true: {
          'base': {
            borderColor: t.colors.primary.default,
            backgroundColor: t.colors.primary.default,
          },
          ':active': {
            borderColor: t.colors.primary.active,
            backgroundColor: t.colors.primary.active,
          },
        },
      },
    },
  },
  thumb: {
    base: {
      width: 10,
      height: 10,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    variants: {
      checked: {
        true: {
          'base': { backgroundColor: t.colors.primary.default },
          ':active': { backgroundColor: t.colors.primary.active },
        },
      },
    },
  },
}));

export const Checkbox = ({ children }: PropsWithChildren) => {
  const [checked, setChecked] = useUncontrolled({ defaultValue: false });
  const { state, props } = useInteraction();
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
      {...checkboxStyles.pressable.rnw()}
    >
      <View {...checkboxStyles.root.rnw({ ...state, variants: { checked } })}>
        {checked && <Check size={15} color="white" />}
      </View>
      {children}
    </Pressable>
  );
};
