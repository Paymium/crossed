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
  rnw,
  useTheme,
  type AllAvailableStyles,
} from '@crossed/styled';
import { FormControl, FormField, FormLabel } from './Form';
import { CloseButton } from '../other/CloseButton';
import { useUncontrolled } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Text } from '../typography/Text';
import { YBox } from '../layout/YBox';

const styles = createStyles(() => ({
  close: { base: { padding: 0 } },
  dynamic: (e: AllAvailableStyles) => e,
}));

export type InputProps = Omit<TextInputProps, 'editable' | 'onChange'> & {
  label?: string;
  clearable?: boolean;
  elementLeft?: ReactNode;
  elementRight?: ReactNode;
  error?: string;
  description?: string;
  extra?: string;
  disabled?: boolean;
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
  const { props: propsInteraction } = useInteraction(allProps);
  const { components } = useTheme();
  const color = components.Input.primary.default.placeholder;

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
              {...rnw(
                form.input,
                error && form.inputError,
                disabled && form.inputDisabled,
                elementLeftWidth &&
                  styles.dynamic({ paddingLeft: elementLeftWidth }),
                elementRightWidth &&
                  styles.dynamic({ paddingRight: elementRightWidth })
              )}
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
        {error && <Text>{error.toString()}</Text>}
      </YBox>
    </FormField>
  );
});
