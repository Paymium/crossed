/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TextInput, type TextInputProps } from 'react-native';
import { forwardRef, useCallback, useState, type ReactNode } from 'react';
import { form } from '../styles/form';
import { composeStyles, CrossedMethods, useInteraction } from '@crossed/styled';
import { FormField } from './Form';
import { CloseButton } from '../buttons/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { YBox } from '../layout/YBox';

export type TextareaProps = Omit<TextInputProps, 'editable' | 'onChange'> & {
  label?: string;
  clearable?: boolean;
  elementLeft?: ReactNode;
  elementRight?: ReactNode;
  error?: string;
  style?: CrossedMethods<any>;
  disabled?: boolean;
  helperText?: string;
};

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      error,
      label,
      clearable,
      defaultValue,
      value: valueProps,
      onChangeText,
      disabled,
      elementRight,
      elementLeft,
      helperText,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useUncontrolled({
      value: valueProps,
      defaultValue,
      onChange: onChangeText,
    });
    const [elementLeftWidth, setElementLeftWidth] = useState(0);
    const [elementRightWidth, setElementRightWidth] = useState(0);
    const { state, props: propsInteraction } = useInteraction(props);
    const { color } = form.placeholder.style().style;

    const onClear = useCallback(() => {
      setValue('');
    }, [setValue]);

    const showClear = clearable && value;

    return (
      <FormField>
        <YBox space="xxs">
          {label && (
            <XBox alignItems="center" space="xxs">
              {label && <FormField.Label>{label}</FormField.Label>}
            </XBox>
          )}
          <XBox>
            {elementLeft && (
              <XBox
                style={form.elementLeft}
                onLayout={({ nativeEvent: { layout } }) =>
                  setElementLeftWidth(layout.width)
                }
              >
                {elementLeft}
              </XBox>
            )}
            <FormField.Control>
              <TextInput
                ref={ref}
                placeholderTextColor={color}
                cursorColor={color}
                editable={!disabled}
                focusable={!disabled}
                multiline={true}
                numberOfLines={10}
                {...props}
                {...propsInteraction}
                {...composeStyles(
                  form.input,
                  error && form.inputError,
                  props.style
                ).rnw({
                  ...props,
                  ...state,
                  disabled,
                  style: [
                    { minHeight: 88, textAlignVertical: 'top' },
                    elementLeftWidth && { paddingLeft: elementLeftWidth },
                    elementRightWidth && { paddingRight: elementRightWidth },
                  ],
                })}
                value={value}
                onChangeText={setValue}
              />
            </FormField.Control>
            <XBox
              style={form.elementRight}
              onLayout={({ nativeEvent: { layout } }) =>
                setElementRightWidth(layout.width)
              }
            >
              {showClear && <CloseButton onPress={onClear} />}
              {elementRight}
            </XBox>
          </XBox>
          {!!helperText && <FormField.Helper>{helperText}</FormField.Helper>}
          {!!error && <FormField.Error>{error.toString()}</FormField.Error>}
        </YBox>
      </FormField>
    );
  }
);
