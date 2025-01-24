/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useSharedValue } from 'react-native-reanimated';
import { XBox } from '../../layout';
import { Pressable } from 'react-native';
import { useCallback } from 'react';
import { useUncontrolled } from '@crossed/core';
import { localContext } from './context';
import { Track } from './Track';
import { Label } from './Label';
import { SwitchProps } from './type';

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

export const Switch = ({
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
  const sharedValue = useSharedValue(value);

  const onChange = useCallback(() => {
    sharedValue.value = !sharedValue.value;
    setValue(!value);
    onChangeProps?.();
  }, [sharedValue, value, setValue, onChangeProps]);

  return (
    <localContext.Provider
      value={{
        height,
        width,
        duration: DURATION,
        sharedValue,
        disabled,
      }}
    >
      <XBox space={'xs'} {...props}>
        <Pressable
          onPress={onChange}
          disabled={disabled}
          aria-checked={value}
          role={'switch'}
        >
          <Track />
        </Pressable>
        {children && <Label>{children}</Label>}
      </XBox>
    </localContext.Provider>
  );
};
