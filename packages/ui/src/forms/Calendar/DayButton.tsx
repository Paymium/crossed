/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { composeStyles, createStyles, CrossedMethods } from '@crossed/styled';
import { Text } from '../../typography/Text';
import { IDay } from '@crossed/use-calendar/src';
import { widthCell } from './styles';

const button = createStyles(({ colors, components: { Action } }) => ({
  default: {
    base: {
      backgroundColor: colors.background.primary,
      borderRadius: 8,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ':hover': {
      backgroundColor: colors.background.hover,
    },
    ':active': {
      backgroundColor: colors.background.active,
    },
  },
  selected: { base: { backgroundColor: Action.primary.default.background } },
  disabled: { base: { opacity: 0.1 } },
}));
const text = createStyles(({ components: { Action } }) => ({
  default: {
    base: {},
  },
  selected: { base: { color: Action.primary.default.text } },
}));

export interface DayButtonProps
  extends Omit<PressableProps, 'style' | 'children'> {
  style?: CrossedMethods<any>;
  day: IDay;
}
export const DayButton = memo(
  ({ day, style, disabled: disabledProps, ...props }: DayButtonProps) => {
    const disabled = disabledProps || day.isAdjacentMonth;
    const handleStyle = useCallback(
      ({
        hovered,
        pressed,
        focused,
      }: {
        hovered?: boolean;
        pressed?: boolean;
        focused?: boolean;
      }) =>
        composeStyles(
          widthCell,
          button.default,
          disabled && button.disabled,
          day.isSelected && button.selected,
          style
        ).style({
          hover: !day.isSelected && hovered,
          focus: focused,
          active: pressed,
        }).style,
      [style, disabled, day]
    );
    return (
      <Pressable
        {...props}
        disabled={disabled}
        role={'button'}
        style={handleStyle}
      >
        <Text
          textAlign={'center'}
          style={composeStyles(text.default, day.isSelected && text.selected)}
        >
          {day.date.getDate()}
        </Text>
      </Pressable>
    );
  }
);
