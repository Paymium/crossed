/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { InputPart } from './InputPart';
import { Fragment, memo, useCallback, useId, useRef } from 'react';
import { DateInputProps, Value } from './types';
import { XBox } from '../../layout/XBox';
import { YBox } from '../../layout/YBox';
import { Text } from '../../typography/Text';
import { form } from '../../styles/form';
import { composeStyles, inlineStyle, isWeb } from '@crossed/styled';
import { useDateInput } from './useDateInput';
import { useFloating } from './useFloating';
import { Calendar, FloatingRefExtended } from './Calendar';
import { growStyles, shrinkStyles } from '../../styles/flex';
import { useUncontrolled } from '@crossed/core';
import { useMedia } from '../../useMedia';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { FormControl, FormField, FormLabel } from '../Form';

const convertToDate = (e?: Partial<Value>) => {
  if (e?.year === undefined || e?.month === undefined || e?.day === undefined)
    return undefined;
  const dateArray = [e?.year, e?.month - 1, e?.day];
  const args = dateArray.filter((l) => typeof l === 'number');
  const date = args.length > 0 ? new Date(...(args as [])) : undefined;
  if (!date || isNaN(date.getTime())) return undefined;
  return date;
};

export const DateInput = memo(
  ({
    value: valueProps,
    onChange: onChangeProps,
    format = 'yyyy-mm-dd',
    locale = 'en',
    picker,
    placeholder = {},
    minDate,
    maxDate,
    availableDates,
    firstDayOfWeek,
    events,
    monthsToDisplay,
    floatingProps,
    id: idProps,
    style,
    label,
    description,
    extra,
  }: DateInputProps) => {
    const { refs, floatingStyles } = useFloating();
    const calendarRef = useRef<FloatingRefExtended>(null);
    const id = useId();
    const isFocus = useRef(false);
    const [valueBridge, setValueBridge] = useUncontrolled({
      value: valueProps,
      onChange: onChangeProps,
    });
    const { inputs, separator, setWithDate, value, containerProps } =
      useDateInput({
        locale,
        format,
        defaultValue:
          valueBridge && valueBridge instanceof Date
            ? {
                day: valueBridge.getDate(),
                month: valueBridge.getMonth() + 1,
                year: valueBridge.getFullYear(),
              }
            : undefined,
        placeholder,
        onChange: (e) => {
          const args = [e.year, e.month - 1, e.day];
          const date = new Date();
          (date as any).setFullYear(...(args as number[]));
          if (e.month > 0 && date.toString() !== 'Invalid Date') {
            setValueBridge?.(date);
          }
        },
      });

    const { md } = useMedia();
    const showFloating = isWeb && md;

    const handleFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        isFocus.current = true;
        // blur input on mobile, if user hide sheet, re-focus on input loop appear sheet
        !isWeb && e.target?.blur?.();
        if (picker && !calendarRef.current?.isOpen()) {
          picker && calendarRef.current?.open();
        }
      },
      [picker]
    );
    const handleBlurInput = useCallback(() => {
      isFocus.current = false;
    }, [picker]);

    return (
      <FormField>
        <XBox alignItems="center" space="xxs">
          {!!label && <FormLabel>{label}</FormLabel>}
          {!!description && (
            <Text style={form.labelDescription}>{description}</Text>
          )}
          {!!extra && (
            <Text style={form.labelExtra} textAlign="right">
              {extra}
            </Text>
          )}
        </XBox>
        <YBox
          pressable
          onPress={
            !showFloating
              ? () => {
                  calendarRef.current?.open();
                }
              : !isFocus.current
                ? containerProps.onPress
                : undefined
          }
          id={idProps}
          ref={refs.setReference as any}
          style={composeStyles(
            form.input,
            inlineStyle(() => ({
              base: {
                justifyContent: 'flex-start',
                paddingVertical: 0,
              },
            })),
            style
          )}
        >
          <XBox
            style={composeStyles(growStyles.on, shrinkStyles.on)}
            alignItems="stretch"
          >
            {inputs.map(({ key, ...item }, i, a) => {
              const Comp = i === 0 ? FormControl : Fragment;
              return [
                <Comp key={`${id}-${key}-control`}>
                  <InputPart
                    key={`${id}-${key}`}
                    {...item}
                    onBlur={handleBlurInput}
                    onFocus={handleFocusInput}
                  />
                </Comp>,
                i + 1 !== a.length ? (
                  <Text
                    key={`${id}-${key}-separator`}
                    style={composeStyles(
                      form.placeholder,
                      inlineStyle(() => ({
                        base: { marginTop: 1, alignSelf: 'center' },
                      }))
                    )}
                  >
                    {separator}
                  </Text>
                ) : null,
              ];
            })}
          </XBox>
          {picker && format === 'yyyy-mm-dd' && (
            <Calendar
              ref={calendarRef}
              selectedDate={convertToDate(value)}
              onDateSelected={(e) => {
                setWithDate(e.date);
              }}
              floatingStyles={floatingStyles}
              setFloating={refs.setFloating}
              locale={locale}
              minDate={minDate}
              maxDate={maxDate}
              availableDates={availableDates}
              firstDayOfWeek={firstDayOfWeek}
              events={events}
              monthsToDisplay={monthsToDisplay}
              floatingProps={floatingProps}
              shards={[refs.reference]}
            />
          )}
        </YBox>
      </FormField>
    );
  }
);
DateInput.displayName = 'DateInput';
