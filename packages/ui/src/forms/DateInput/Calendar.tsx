/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import {
  composeStyles,
  createStyles,
  inlineStyle,
  useTheme,
} from '@crossed/styled';
import { Floating, FloatingRef } from '../../overlay';
import { ChevronDown } from '@crossed/unicons';
import { Focus } from './Focus';
import {
  alignItemsStyle,
  justifyContentStyle,
  positionStyles,
} from '../../styles';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { CSSProperties, useCallback, useRef } from 'react';
import {
  Calendar as CalendarComponent,
  type CalendarProps as CalendarComponentProps,
} from '../Calendar';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

export interface CalendarProps extends CalendarComponentProps {
  floatingStyles: CSSProperties;
  setFloating: (_node: HTMLElement | null) => void;
  locale: string;
}
export const Calendar = ({
  onDateSelected,
  setFloating,
  floatingStyles,
  locale,
  events,
  firstDayOfWeek,
  maxDate,
  minDate,
  monthsToDisplay,
  selectedDate,
  availableDates,
}: CalendarProps) => {
  const { colors } = useTheme();
  const open = useRef(false);
  const toggleOpen = useCallback((e) => {
    open.current = e;
  }, []);
  const floatingRef = useRef<FloatingRef | null>(null);
  return (
    <Floating ref={floatingRef} onChange={toggleOpen}>
      <Floating.Trigger>
        <ChevronDown color={colors.text.secondary} />
      </Floating.Trigger>
      <Floating.Portal>
        <Focus
          {...composeStyles(
            open.current && positionStyles.absoluteFill,
            open.current && inlineStyle(() => ({ base: { display: 'flex' } })),
            open.current && justifyContentStyle.center,
            open.current && alignItemsStyle.center
          ).className()}
          enabled={open.current}
          onEscapeKey={floatingRef.current?.close}
          onClickOutside={floatingRef.current?.close}
        >
          <Floating.Content
            exiting={FadeOut.duration(duration)}
            entering={FadeIn.duration(duration)}
            ref={setFloating as any}
            style={composeStyles(styles.dynamic(floatingStyles))}
          >
            <CalendarComponent
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              availableDates={availableDates}
              events={events}
              maxDate={maxDate}
              minDate={minDate}
              monthsToDisplay={monthsToDisplay}
              selectedDate={selectedDate}
              onDateSelected={onDateSelected}
            />
          </Floating.Content>
        </Focus>
      </Floating.Portal>
    </Floating>
  );
};
