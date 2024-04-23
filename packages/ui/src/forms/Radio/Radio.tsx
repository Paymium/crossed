/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { createStyles } from '@crossed/styled';
import { useInteraction } from '@crossed/styled/plugins';
import { useCallback, useTransition, type PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

const radioStyles = createStyles((t) => ({
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
      borderRadius: 44,
      borderWidth: 1,
      borderColor: t.colors.neutral.hight,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    ':hover': { borderColor: t.colors.neutral[600] },
    ':active': {
      borderColor: t.colors.neutral.hight,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      elevation: 5,
    },
    ':disabled': {
      backgroundColor: t.colors.neutral.muted,
      borderColor: t.colors.neutral.muted,
    },
    'variants': {
      checked: {
        true: {
          'base': { borderColor: t.colors.brand.bright },
          ':active': { borderColor: t.colors.brand.satured },
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
          'base': { backgroundColor: t.colors.brand.bright },
          ':active': { backgroundColor: t.colors.brand.satured },
        },
      },
    },
  },
}));

export const Radio = ({ children }: PropsWithChildren) => {
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
      {...radioStyles.pressable.rnw()}
    >
      <View {...radioStyles.root.rnw({ ...state, variants: { checked } })}>
        <View {...radioStyles.thumb.rnw({ ...state, variants: { checked } })} />
      </View>
      {children}
    </Pressable>
  );
};
