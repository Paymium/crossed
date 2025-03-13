/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { CrossedMethods, inlineStyle } from '@crossed/styled';

export interface InputPartProps
  extends Omit<TextInputProps, 'style' | 'value'> {
  style?: CrossedMethods<any>;
  value?: string;
  label?: string;
}

export const InputPart = forwardRef<TextInput, InputPartProps>(
  ({ value, onChangeText, placeholder, onBlur, onFocus }, ref) => {
    return (
      <TextInput
        selectTextOnFocus
        {...inlineStyle(() => ({
          base: {
            borderWidth: 0,
            backgroundColor: 'transparent',
            maxWidth: 64,
            textAlign: 'center',
          },
          web: {
            ':focus': {
              outlineWidth: 0,
            },
            ':focus-visible': {
              outlineWidth: 0,
            },
          },
        })).rnw()}
        value={value}
        placeholder={placeholder}
        ref={ref}
        showSoftInputOnFocus={false}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType="numeric"
      />
    );
  }
);
