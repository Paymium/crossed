/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles, useTheme } from '@crossed/styled';
import { Floating, FloatingRef } from '../../overlay';
import { ChevronDown } from '@crossed/unicons';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  Calendar as CalendarComponent,
  type CalendarProps as CalendarComponentProps,
} from '../Calendar';
import { IDay } from '@crossed/use-calendar';
import { composeRefs } from '@crossed/core';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

export interface CalendarProps extends CalendarComponentProps {
  floatingStyles: CSSProperties;
  setFloating: (_node: HTMLElement | null) => void;
  locale: string;
}
export const Calendar = forwardRef<FloatingRef, CalendarProps>(
  (
    {
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
    },
    ref
  ) => {
    const { colors } = useTheme();
    const open = useRef(false);
    const floatingRef = useRef<FloatingRef | null>(null);

    const toggleOpen = useCallback((e) => {
      open.current = e;
    }, []);

    const handleDateSelected = useCallback(
      (e: IDay) => {
        onDateSelected?.(e);
        floatingRef.current?.close();
      },
      [onDateSelected]
    );

    const handleClose = useCallback((e: KeyboardEvent | PointerEvent) => {
      if (
        e instanceof PointerEvent ||
        (e instanceof KeyboardEvent && e.key === 'Escape')
      ) {
        floatingRef.current?.close();
      }
    }, []);

    useEffect(() => {
      if (open.current) {
        document.addEventListener('click', handleClose);
        document.addEventListener('keyup', handleClose);
        return () => {
          document.removeEventListener('click', handleClose);
          document.removeEventListener('keyup', handleClose);
        };
      }
      return () => {};
    }, [open.current]);

    return (
      <Floating ref={composeRefs(floatingRef, ref)} onChange={toggleOpen}>
        <ChevronDown color={colors.text.secondary} />
        <Floating.Portal>
          {/*<Focus*/}
          {/*  {...composeStyles(*/}
          {/*    open.current && positionStyles.absoluteFill,*/}
          {/*    open.current &&*/}
          {/*      inlineStyle(() => ({ base: { display: 'flex' } })),*/}
          {/*    open.current && justifyContentStyle.center,*/}
          {/*    open.current && alignItemsStyle.center*/}
          {/*  ).className()}*/}
          {/*  enabled={open.current}*/}
          {/*  onEscapeKey={floatingRef.current?.close}*/}
          {/*  onClickOutside={floatingRef.current?.close}*/}
          {/*  scrollLock={false}*/}
          {/*  focusLock={false}*/}
          {/*  autoFocus={false}*/}
          {/*  noIsolation*/}
          {/*>*/}
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
              onDateSelected={handleDateSelected}
            />
          </Floating.Content>
          {/*</Focus>*/}
        </Floating.Portal>
      </Floating>
    );
  }
);
