/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useUncontrolled } from '@crossed/core';
import { composeStyles, createStyles } from '@crossed/styled';
import { useCallback, useTransition, type PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

const rootStyles = createStyles((t) => ({
  default: {
    base: {
      width: 16,
      height: 16,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: t.colors.border.secondary,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: t.colors.background.secondary,
    },
  },
  hover: { base: { borderColor: t.colors.border.tertiary } },
  active: { base: { shadowColor: 'black', shadowOpacity: 0.1, elevation: 5 } },
  disabled: {
    base: {
      backgroundColor: t.colors.primary[1],
      borderColor: t.colors.primary[1],
    },
  },
  checked: { base: { borderColor: t.colors.border.primary } },
  checkedActive: { base: { borderColor: t.colors.border.primary } },
}));

const pressableStyles = createStyles(() => ({
  pressable: {
    base: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
  },
}));

const thumbStyles = createStyles((t) => ({
  default: {
    base: {
      width: 10,
      height: 10,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
  },
  checked: {
    base: { backgroundColor: t.colors.background.primary },
  },
  checkedActive: {
    base: { backgroundColor: t.colors.background.primary },
  },
}));

export const Radio = ({
  children,
  disabled,
}: PropsWithChildren<{ disabled?: boolean }>) => {
  const [checked, setChecked] = useUncontrolled({ defaultValue: false });
  const [, setTransition] = useTransition();

  const handlePress = useCallback(() => {
    setTransition(() => {
      setChecked(!checked);
    });
  }, [setChecked, checked, setTransition]);

  return (
    <Pressable
      onPress={handlePress}
      style={({
        pressed,
        hovered,
        focused,
      }: {
        pressed: boolean;
        hovered?: boolean;
        focused?: boolean;
      }) =>
        composeStyles(pressableStyles.pressable).rnw({
          active: pressed,
          hover: hovered,
          focus: focused,
        }).style
      }
    >
      {({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => (
        <>
          <View
            {...composeStyles(
              rootStyles.default,
              hovered && rootStyles.hover,
              pressed && rootStyles.active,
              checked && rootStyles.checked,
              checked && pressed && rootStyles.checkedActive,
              disabled && rootStyles.disabled
            ).rnw()}
          >
            <View
              {...composeStyles(
                thumbStyles.default,
                checked && thumbStyles.checked
              ).rnw()}
            />
          </View>
          {children}
        </>
      )}
    </Pressable>
  );
};
Radio.displayName = 'Radio';
