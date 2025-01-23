/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Registry } from '@crossed/styled';
import { themes } from '@crossed/theme';
import { useSharedValue } from 'react-native-reanimated';
import { XBox } from '../../layout';
import { Pressable } from 'react-native';
import { useCallback, useMemo, useTransition } from 'react';
import { useUncontrolled } from '@crossed/core';
import { localContext } from './context';
import { Track } from './Track';
import { Label } from './Label';
import { SwitchProps, TrackColors } from './type';

const getColors = (
  trackColorsProps: TrackColors | undefined,
  themeName: string
) => {
  if (trackColorsProps) return trackColorsProps;

  const theme = themeName === 'light' ? themes.light : themes.dark;
  return {
    on: theme.colors.background.brand,
    off: theme.colors.neutral['70'],
  };
};

/**
 * Switch Component
 *
 * A reusable component that allows toggling between on and off states.
 * It supports animated transitions, custom colors, and an optional label.
 *
 * @param {boolean} value - The current state of the switch (true for "on", false for "off").
 * @param {() => void} onChangeProps - Callback function triggered when the switch state changes.
 * @param {Object} [trackColorsProps] - Custom colors for the switch track.
 * @param {string} [trackColorsProps.on] - Color of the track when the switch is "on".
 * @param {string} [trackColorsProps.off] - Color of the track when the switch is "off"
 * @param {React.ReactNode} [children] - Optional children elements displayed next to the switch (replaces the `label` prop).
 * @param {XBoxProps} props - Additional props passed to the parent XBox container (e.g., spacing, styling).
 * @param {boolean} disabled - disable switch component when disabled opacity is set to 0.5 and trackColorsProps.off is used
 *
 */

export const Switch = ({
  value: valueProps,
  onChangeProps,
  trackColorsProps,
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
  const themeName = Registry.themeName;
  const trackColors = useMemo(() => {
    return getColors(trackColorsProps, themeName);
  }, [themeName]);
  const sharedValue = useSharedValue(value);
  const [, setTransition] = useTransition();

  const onChange = useCallback(() => {
    setTransition(() => {
      sharedValue.value = !sharedValue.value;
      setValue(!value);
    });
    onChangeProps?.();
  }, [onChangeProps]);

  return (
    <localContext.Provider
      value={{
        height,
        width,
        duration: DURATION,
        sharedValue,
        disabled,
        trackColors,
      }}
    >
      <XBox space={'xs'} {...props}>
        <Pressable onPress={onChange} disabled={disabled}>
          <Track />
        </Pressable>
        <Label>{children}</Label>
      </XBox>
    </localContext.Provider>
  );
};
