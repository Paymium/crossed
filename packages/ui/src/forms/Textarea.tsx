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
import { FormControl, FormField, FormLabel } from './Form';
import { CloseButton } from '../other/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Text } from '../typography/Text';
import { YBox } from '../layout/YBox';

export type TextareaProps = Omit<TextInputProps, 'editable' | 'onChange'> & {
  label?: string;
  clearable?: boolean;
  elementLeft?: ReactNode;
  elementRight?: ReactNode;
  error?: string;
  description?: string;
  extra?: string;
  style?: CrossedMethods<any>;
  disabled?: boolean;
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
      description,
      extra,
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
          {Boolean(label || description || extra) && (
            <XBox alignItems="center" space="xxs">
              {Boolean(label) && <FormLabel>{label}</FormLabel>}
              {Boolean(description) && (
                <Text style={form.labelDescription}>{description}</Text>
              )}
              {Boolean(extra) && (
                <Text style={form.labelExtra} textAlign="right">
                  {extra}
                </Text>
              )}
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
            <FormControl>
              <TextInput
                ref={ref}
                placeholderTextColor={color}
                cursorColor={color}
                editable={!disabled}
                multiline={true}
                numberOfLines={10}
                {...props}
                {...propsInteraction}
                {...composeStyles(form.input, error && form.inputError).rnw({
                  ...props,
                  ...state,
                  disabled,
                  style: [
                    { minHeight: 88, textAlignVertical: 'top' },
                    props.style as any,
                    elementLeftWidth && { paddingLeft: elementLeftWidth },
                    elementRightWidth && { paddingRight: elementRightWidth },
                  ],
                })}
                value={value}
                onChangeText={setValue}
              />
            </FormControl>
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
          {Boolean(error) && <Text color="error">{error.toString()}</Text>}
        </YBox>
      </FormField>
    );
  }
);
