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
} from '@crossed/styled';
import { Floating, FloatingProps, FloatingRef, Sheet } from '../../overlay';
import { ChevronDown } from '@crossed/unicons';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useTransition,
} from 'react';
import {
  Calendar as CalendarComponent,
  type CalendarProps as CalendarComponentProps,
} from '../Calendar';
import { IDay } from '@crossed/use-calendar';
import { Box } from '../../layout/Box';
import { useMedia } from '../../useMedia';
import { composeEventHandlers } from '@crossed/core';
import { Focus } from './Focus';
import { ActionSheetRef } from '@crossed/sheet';
import { XBox } from '../../layout';

const duration = 100;

const styles = createStyles(({ space, colors, radius }) => ({
  dynamic: (e: any) => {
    const transform = [];
    if (e.transform) {
      const [x, y] = e.transform
        .replace('translate(', '')
        .replace(')', '')
        .replaceAll('px', '')
        .replaceAll(' ', '')
        .split(',');
      transform.push({ translateX: Number(x) }, { translateY: Number(y) });
    }
    return Object.assign({}, e, { transform });
  },
  calendar: {
    base: {
      borderWidth: 1,
      borderColor: colors.border.primary.w,
      padding: space.md,
      borderRadius: radius['2xl'],
      // boxShadow,
      // position: 'absolute',
      width: 432,
    },
  },
}));

export type FloatingRefExtended = FloatingRef & { isOpen: () => boolean };

export type CalendarProps = CalendarComponentProps &
  Pick<ComponentProps<typeof Focus>, 'shards'> & {
    floatingStyles: CSSProperties;
    setFloating: (_node: HTMLElement | null) => void;
    locale: string;
    floatingProps?: FloatingProps;
  };
export const Calendar = forwardRef<FloatingRefExtended, CalendarProps>(
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
      floatingProps,
      shards,
    },
    ref
  ) => {
    const [, setTransition] = useTransition();
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
          floatingRef.current?.close();
          sheetRef.current?.hide();
        },
        isOpen() {
          return open.current;
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
        setTransition(() => {
          onDateSelected?.(e);
        });
        floatingRef.current?.close();
        sheetRef.current?.hide();
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

    const showFloating = isWeb && md;

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
        ref={setFloating as any}
        style={composeStyles(
          showFloating && styles.calendar,
          showFloating && styles.dynamic(floatingStyles)
        )}
      />
    );

    const renderIcon = (
      <XBox>
        <ChevronDown /*color={colors.text.secondary} */ />
      </XBox>
    );

    return showFloating ? (
      <Floating
        {...floatingProps}
        ref={floatingRef}
        onChange={composeEventHandlers(toggleOpen, floatingProps?.onChange)}
      >
        {renderIcon}
        <Floating.Portal>
          <Focus
            onEscapeKey={handleClose}
            onClickOutside={handleClose as any}
            shards={shards}
            returnFocus={false}
          >
            <Floating.Content
              exiting={FadeOut.duration(duration)}
              entering={FadeIn.duration(duration)}
              style={composeStyles(
                inlineStyle(() => ({
                  base: { zIndex: 100, position: 'absolute' },
                  // web: { base: { boxShadow } },
                }))
              )}
            >
              {renderCalendar}
            </Floating.Content>
          </Focus>
        </Floating.Portal>
      </Floating>
    ) : (
      <Sheet ref={sheetRef} onOpenChange={toggleOpen}>
        {renderIcon}
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
