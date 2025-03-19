/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useCallback } from 'react';
import { Pressable, PressableProps } from 'react-native';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  isWeb,
} from '@crossed/styled';
import { IDay } from '@crossed/use-calendar/src';
import { widthCell } from './styles';
import { Headline } from '../../typography';

const button = createStyles(({ colors }) => ({
  default: {
    base: {
      backgroundColor: colors.background.primary,
      borderRadius: 8,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ':hover': {
      backgroundColor: colors.background.hover,
    },
    ':active': {
      backgroundColor: colors.background.active,
    },
    media: { md: { height: 44 } },
  },
  selected: { base: { backgroundColor: colors.text.brand } },
  disabled: { base: { opacity: 0.1 } },
  today: { base: { borderWidth: 2, borderColor: colors.text.brand } },
}));
const text = createStyles(({ colors, components: { Action } }) => ({
  default: { base: { fontWeight: '500' } },
  noMarginTop: { base: { marginTop: 0 } },
  selected: { base: { color: Action.primary.default.text } },
  today: { base: { color: colors.text.brand } },
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
          day.isToday && button.today,
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
        <Headline
          textAlign={'center'}
          size={'md'}
          style={composeStyles(
            text.default,
            day.isToday && text.today,
            day.isSelected && text.selected,
            !isWeb && text.noMarginTop
          )}
        >
          {day.date.getDate()}
        </Headline>
      </Pressable>
    );
  }
);
