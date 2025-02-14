/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { memo, useId } from 'react';
import { Text } from '../../typography';
import { widthCell } from './styles';
import { IDay } from '@crossed/use-calendar/src';
import { capFirstLetter } from './utils';
import { XBox } from '../../layout';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';

export const WeekDay = memo(
  ({
    days,
    locale,
    style,
  }: {
    days: IDay[];
    locale: string;
    style?: CrossedMethods<any>;
  }) => {
    const id = useId();
    return (
      <XBox space={'xxs'} justifyContent="between" style={style}>
        {days.map((day) => (
          <Text
            key={`${id}-${day.date.getDate()}`}
            color={'secondary'}
            size={'lg'}
            textAlign={'center'}
            style={composeStyles(
              widthCell,
              inlineStyle(() => ({ base: { fontWeight: '500' } }))
            )}
          >
            {capFirstLetter(
              (day.date as Date).toLocaleString(locale, {
                weekday: 'short',
              })
            )}
          </Text>
        ))}
      </XBox>
    );
  }
);
