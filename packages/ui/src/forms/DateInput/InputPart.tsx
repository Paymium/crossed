/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useCallback, useRef, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { composeStyles, CrossedMethods, inlineStyle } from '@crossed/styled';
import { visibility } from '../../styles';
import { Text } from '../../typography';
import { Input } from '../Input';
import { composeRefs } from '@crossed/core';

export interface InputPartProps
  extends Omit<TextInputProps, 'style' | 'value'> {
  style?: CrossedMethods<any>;
  value?: string;
  label?: string;
}

export const InputPart = forwardRef<TextInput, InputPartProps>(
  ({ value, onChangeText, placeholder, label }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const inputRef = useRef<TextInput>();
    const onBlur = useCallback(() => {
      setIsFocus(false);
    }, [setIsFocus]);
    const onFocus = useCallback(() => {
      setIsFocus(true);
    }, [setIsFocus]);

    const handlePress = useCallback(() => {
      inputRef?.current?.focus?.();
    }, []);

    return (
      <>
        <Text
          onPress={handlePress}
          style={composeStyles(
            isFocus &&
              inlineStyle(({ colors }) => ({
                base: { backgroundColor: colors.background.primary },
              }))
          )}
        >
          {label || value || placeholder}
        </Text>
        <Input
          selectTextOnFocus
          style={visibility.hidden}
          value={value}
          placeholder={placeholder}
          ref={composeRefs(ref, inputRef)}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </>
    );
  }
);
