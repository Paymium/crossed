/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { SwitchProps } from './type';
import { useUncontrolled } from '@crossed/core';
import { useSharedValue } from 'react-native-reanimated';
import { useCallback } from 'react';
import { localContext } from './context';
import { Pressable } from 'react-native';
import { composeStyles, inlineStyle } from '@crossed/styled';

/**
 * Switch Component
 *
 * A reusable component that allows toggling between on and off states.
 * It supports animated transitions, custom colors, and an optional label.
 *
 * @param {boolean} value - The current state of the switch (true for "on", false for "off").
 * @param {() => void} onChange - Callback function triggered when the switch state changes.
 * @param {React.ReactNode} [children] - Optional children elements displayed next to the switch (replaces the `label` prop).
 * @param {XBoxProps} props - Additional props passed to the parent XBox container (e.g., spacing, styling).
 * @param {boolean} disabled - disable switch component when disabled opacity is set to 0.5 and trackColorsProps.off is used
 *
 */

export const Root = ({
  value: valueProps,
  onChange: onChangeProps,
  children,
  defaultValue = false,
  disabled,
  ...props
}: SwitchProps) => {
  const DURATION = 300;

  const [value, setValue] = useUncontrolled({
    defaultValue: defaultValue,
    value: valueProps,
    onChange: onChangeProps,
  });

  const height = useSharedValue(24);
  const width = useSharedValue(48);

  const onChange = useCallback(() => {
    setValue(!value);
  }, [value, setValue]);

  return (
    <localContext.Provider
      value={{
        height,
        width,
        duration: DURATION,
        value,
        disabled,
      }}
    >
      <Pressable
        onPress={onChange}
        disabled={disabled}
        aria-checked={value}
        role={'switch'}
        style={
          composeStyles(
            inlineStyle(({ space }) => ({
              base: {
                display: 'flex',
                flexDirection: 'row',
                gap: space.xs,
                alignItems: 'center',
              },
            })),
            props.style
          ).style().style
        }
        {...props}
      >
        {children}
      </Pressable>
    </localContext.Provider>
  );
};
