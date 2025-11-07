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
import { Text } from '../../typography';
import { Box } from '../../layout';
import { positionStyles } from '../../styles';

const button = createStyles(({ radius, colors }) => ({
  default: {
    'base': {
      // backgroundColor: colors.background.primary.solid,
      borderRadius: radius.full,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ':hover': {
      // backgroundColor: colors.background.hover,
    },
    ':active': {
      // backgroundColor: colors.background.active,
    },
    // 'media': { md: { height: 44 } },
  },
  selected: {
    base: {
      backgroundColor: colors.background.brand.solid.default,
    },
  },
  today: {
    base: {
      width: 5,
      height: 5,
      borderRadius: radius.full,
      bottom: 0,
      backgroundColor: colors.background.brand.solid.default,
    },
  },
}));
const text = createStyles(({ colors }) => ({
  hover: { base: { color: colors.text.secondary.hover, fontWeight: '500' } },
  noMarginTop: { base: { marginTop: 0 } },
  selected: {
    base: {
      color: colors.primary.base.white,
    },
  },
  disabled: { base: { color: colors.text.disabled.default } },
  today: {
    base: {
      color: colors.primary.base.white,
    },
  },
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
          day.isSelected && button.selected,
          style
        ).rnw({
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
        {({ hovered }: any) => (
          <>
            {day.isToday && (
              <Box
                style={composeStyles(button.today, positionStyles.absolute)}
              />
            )}
            <Text
              textAlign={'center'}
              fontSize={'sm'}
              color={'secondary'}
              style={composeStyles(
                hovered && text.hover,
                disabled && text.disabled,
                day.isSelected && text.selected,
              )}
            >
              {day.date.getDate()}
            </Text>
          </>
        )}
      </Pressable>
    );
  }
);
