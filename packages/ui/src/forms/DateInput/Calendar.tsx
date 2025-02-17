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
  isWeb,
  useTheme,
} from '@crossed/styled';
import { Floating, FloatingRef, Sheet } from '../../overlay';
import { ChevronDown } from '@crossed/unicons';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Calendar as CalendarComponent,
  type CalendarProps as CalendarComponentProps,
} from '../Calendar';
import { IDay } from '@crossed/use-calendar';
import { Box } from '../../layout';
import { useMedia } from '../../useMedia';
import { ActionSheetRef } from '@crossed/sheet/src';

const duration = 100;

const styles = createStyles(() => ({ dynamic: (e) => e }));

export type CalendarProps = CalendarComponentProps & {
  floatingStyles: CSSProperties;
  setFloating: (_node: HTMLElement | null) => void;
  locale: string;
};
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
    const { md } = useMedia();
    const open = useRef(false);
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          floatingRef.current?.open();
          sheetRef.current?.show();
        },
        close: () => {
          floatingRef.current?.open();
          sheetRef.current?.hide();
        },
      }),
      []
    );
    const floatingRef = useRef<FloatingRef | null>(null);
    const sheetRef = useRef<ActionSheetRef | null>(null);

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
      if (isWeb && open.current) {
        document.addEventListener('click', handleClose);
        document.addEventListener('keyup', handleClose);
        return () => {
          document.removeEventListener('click', handleClose);
          document.removeEventListener('keyup', handleClose);
        };
      }
      return () => {};
    }, [open.current]);

    const renderCalendar = (
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
    );

    return isWeb || md ? (
      <Floating ref={floatingRef} onChange={toggleOpen}>
        <ChevronDown color={colors.text.secondary} />
        <Floating.Portal>
          <Floating.Content
            exiting={FadeOut.duration(duration)}
            entering={FadeIn.duration(duration)}
            ref={setFloating as any}
            style={composeStyles(styles.dynamic(floatingStyles))}
          >
            {renderCalendar}
          </Floating.Content>
        </Floating.Portal>
      </Floating>
    ) : (
      <Sheet ref={sheetRef} onOpenChange={toggleOpen}>
        <Sheet.Content
          // enable autoHeight snap
          containerStyle={inlineStyle(() => ({ base: { height: undefined } }))}
        >
          <Box
            style={inlineStyle(({ space }) => ({
              base: {
                height: undefined,
                paddingHorizontal: space.xs,
                paddingVertical: space.md,
              },
            }))}
          >
            {renderCalendar}
          </Box>
        </Sheet.Content>
      </Sheet>
    );
  }
);
