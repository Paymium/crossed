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
} from '@crossed/styled';
import { FormControl, FormField, FormLabel } from './Form';
import { CloseButton } from '../buttons/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Text } from '../typography/Text';
import { YBox } from '../layout/YBox';

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
   * Description of input
   */
  description?: string;
  /**
   * Extra of label
   */
  extra?: string;
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
    description,
    extra,
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
  const { color } = form.placeholder.style().style;

  const onClear = useCallback(() => {
    setValue('');
  }, [setValue]);

  const showClear = clearable && value;
  return (
    <FormField
      disabled={disabled || (!props.focusable && props.focusable !== undefined)}
    >
      <YBox space="xxs">
        {(label || description || extra) && (
          <XBox alignItems="center" space="xxs">
            {label && <FormLabel>{label}</FormLabel>}
            {description && (
              <Text style={form.labelDescription}>{description}</Text>
            )}
            {extra && (
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
          </FormControl>
          <XBox
            style={composeStyles(form.elementRight, gapStyles.xs)}
            onLayout={({ nativeEvent: { layout } }) =>
              setElementRightWidth(layout.width)
            }
          >
            {isValidElement(elementRight) &&
            typeof elementRight.type !== 'string' &&
            (elementRight.type as any).displayName === 'CrossedText'
              ? cloneElement(elementRight, {
                  style: [(elementRight as any).style, { color }],
                } as any)
              : elementRight}
            {showClear && (
              <CloseButton onPress={onClear} style={styles.close} />
            )}
          </XBox>
        </XBox>
        {error && <Text color="error">{error.toString()}</Text>}
      </YBox>
    </FormField>
  );
});

Input.displayName = 'Input';
