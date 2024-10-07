/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { forwardRef, useContext, useEffect } from 'react';
import { Text, type TextProps } from '../../typography/Text';
import { buttonContext } from './context';
import { composeStyles } from '@crossed/styled';
import {
  textDisabledStyles,
  textErrorDisabledStyles,
  textErrorStyles,
  textStyles,
} from './styles';
import React from 'react';
type ButtonTextProps = TextProps;

const ButtonText = forwardRef<any, ButtonTextProps>(
  (props: ButtonTextProps, ref) => {
    const { variant, error, state, disabled, setTextId, textId } =
      useContext(buttonContext);

    useEffect(() => {
      if (props.id && textId !== props.id) {
        setTextId(props.id);
      }
    }, [props.id, textId, setTextId]);

    return (
      <Text
        weight="lg"
        {...props}
        // disabled={disabled}
        {...state}
        id={textId}
        style={composeStyles(
          textStyles.default,
          variant && textStyles[variant],
          disabled && textStyles.disabled,
          disabled && variant && textDisabledStyles[variant],
          variant && error && textErrorStyles[variant],
          disabled && variant && error && textErrorDisabledStyles[variant],
          props.style
        )}
        ref={ref}
      />
    );
  }
);
ButtonText.displayName = 'Button.Text';

export { ButtonText, type ButtonTextProps };
