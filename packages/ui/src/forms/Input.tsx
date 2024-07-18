/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TextInput, type TextInputProps } from 'react-native';
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { form, type FormInput } from '../styles/form';
import { useInteraction } from '@crossed/styled';
import { FormControl, FormField, FormLabel } from './Form';
import { CloseButton } from '../other/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Text } from '../typography/Text';
import { YBox } from '../layout/YBox';

export type InputProps = Omit<TextInputProps, 'editable' | 'onChange'> &
  Omit<FormInput, 'variants'> &
  Pick<FormInput['variants'], 'error'> & {
    label?: string;
    clearable?: boolean;
    elementLeft?: ReactNode;
    elementRight?: ReactNode;
    error?: string;
    description?: string;
    extra?: string;
  };

export const Input = forwardRef<TextInput, InputProps>(
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
          {(label || description || extra) && (
            <XBox alignItems="center" space="xxs">
              {label && <FormLabel>{label}</FormLabel>}
              {description && (
                <Text {...form.labelDescription.rnw()}>{description}</Text>
              )}
              {extra && (
                <Text {...form.labelExtra.rnw()} textAlign="right">
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
                {isValidElement(elementLeft) &&
                typeof elementLeft.type !== 'string' &&
                (elementLeft.type as any).displayName === 'CrossedText'
                  ? cloneElement(elementLeft, {
                      style: [(elementLeft as any).style, { color }],
                    } as any)
                  : elementLeft}
              </XBox>
            )}
            <FormControl>
              <TextInput
                ref={ref}
                placeholderTextColor={color}
                cursorColor={color}
                editable={!disabled}
                {...props}
                {...propsInteraction}
                {...form.input.rnw({
                  ...props,
                  ...state,
                  style: [
                    props.style as any,
                    elementLeftWidth && { paddingLeft: elementLeftWidth },
                    elementRightWidth && { paddingRight: elementRightWidth },
                  ],
                  disabled,
                  variants: { error: !!error },
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
              {isValidElement(elementRight) &&
              typeof elementRight.type !== 'string' &&
              (elementRight.type as any).displayName === 'CrossedText'
                ? cloneElement(elementRight, {
                    style: [(elementRight as any).style, { color }],
                  } as any)
                : elementRight}
            </XBox>
          </XBox>
          {error && <Text color="error">{error.toString()}</Text>}
        </YBox>
      </FormField>
    );
  }
);
