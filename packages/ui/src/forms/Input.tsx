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
import { form } from '../styles/form';
import { gapStyles } from '../styles/gap';
import {
  useInteraction,
  createStyles,
  composeStyles,
  CrossedMethods,
  useTheme,
} from '@crossed/styled';
import { FormField } from './Form';
import { CloseButton } from '../buttons/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { YBox } from '../layout/YBox';
import { AlertCircle } from '@crossed/icons';

const styles = createStyles(() => ({
  close: { base: { padding: 0 } },
}));

export type InputProps = Omit<
  TextInputProps,
  'editable' | 'onChange' | 'style'
> & {
  /**
   * Label of input
   */
  label?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Render clearable button if value is filled
   */
  clearable?: boolean;
  elementLeft?: ReactNode;
  elementRight?: ReactNode;
  /**
   * Error to render
   */
  error?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * style to extends
   */
  style?: CrossedMethods<any>;
};

export const Input = forwardRef<TextInput, InputProps>((allProps, ref) => {
  const {
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
  } = allProps;
  const [value, setValue] = useUncontrolled({
    value: valueProps,
    defaultValue,
    onChange: onChangeText,
  });
  const [elementLeftWidth, setElementLeftWidth] = useState(0);
  const [elementRightWidth, setElementRightWidth] = useState(0);
  const { state, props: propsInteraction } = useInteraction(allProps);
  const { colors } = useTheme();
  const color = colors.text.placeholder.default;

  const onClear = useCallback(() => {
    setValue('');
  }, [setValue]);

  const showClear = !!(clearable && value);
  return (
    <FormField>
      <YBox space="sm">
        {!!label && (
          <XBox alignItems="center" space="xxs">
            {!!label && <FormField.Label>{label}</FormField.Label>}
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
              (elementLeft.type as any).displayName === 'Text'
                ? cloneElement(elementLeft, {
                    style: [(elementLeft as any).style, { color }],
                  } as any)
                : elementLeft}
            </XBox>
          )}
          <FormField.Control>
            <TextInput
              ref={ref}
              placeholderTextColor={color}
              cursorColor={color}
              editable={!disabled}
              focusable={!disabled}
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
                  elementLeftWidth && { paddingLeft: elementLeftWidth },
                  elementRightWidth && { paddingRight: elementRightWidth },
                ],
              })}
              value={value}
              onChangeText={setValue}
            />
          </FormField.Control>
          {(!!elementRight || !!showClear || !!error) && (
            <XBox
              style={composeStyles(form.elementRight, gapStyles.xs)}
              onLayout={({ nativeEvent: { layout } }) =>
                setElementRightWidth(layout.width)
              }
            >
              {isValidElement(elementRight) &&
              typeof elementRight.type !== 'string' &&
              (elementRight.type as any).displayName === 'Text'
                ? cloneElement(elementRight, {
                    style: [(elementRight as any).style, { color }],
                  } as any)
                : elementRight}
              {!!showClear && (
                <CloseButton onPress={onClear} style={styles.close} />
              )}
              {!!error && (
                <AlertCircle color={'foreground.error.secondary.default'} />
              )}
            </XBox>
          )}
        </XBox>
        {!!helperText && <FormField.Helper>{helperText}</FormField.Helper>}
        {!!error && <FormField.Error>{error.toString()}</FormField.Error>}
      </YBox>
    </FormField>
  );
});

Input.displayName = 'Input';
