/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { ComponentProps, useContext, useEffect } from 'react';
import { Text } from '../../typography/Text';
import { buttonContext } from './context';
import { composeStyles } from '@crossed/styled';
import {
  buttonPrimaryErrorStyle,
  buttonPrimaryStyles,
  buttonPrimarySuccessStyle,
  buttonSecondaryErrorStyle,
  buttonSecondaryStyles,
  buttonTertiaryErrorStyle,
  buttonTertiaryStyles,
  textStyles,
} from './styles';
import { fontSizeStyles } from '../../styles';

export type ButtonTextProps = ComponentProps<typeof Text>;

export const ButtonText = (props: ButtonTextProps) => {
  const { variant, state, disabled, setTextId, textId, error, size, success } =
    useContext(buttonContext);

  const { hover, active } = state || {};

  useEffect(() => {
    if (props.id && textId !== props.id) {
      setTextId(props.id);
    }
  }, [props.id, textId, setTextId]);

  return (
    <Text
      {...props}
      id={textId}
      style={composeStyles(
        textStyles.default,
        variant === 'primary' &&
          composeStyles(
            ...(error
              ? [
                  buttonPrimaryErrorStyle.text,
                  hover && buttonPrimaryErrorStyle.textHover,
                  active && buttonPrimaryErrorStyle.textActive,
                  disabled && buttonPrimaryErrorStyle.textDisabled,
                ]
              : success
                ? [
                    buttonPrimarySuccessStyle.text,
                    hover && buttonPrimarySuccessStyle.textHover,
                    active && buttonPrimarySuccessStyle.textActive,
                    disabled && buttonPrimarySuccessStyle.textDisabled,
                  ]
                : [
                    buttonPrimaryStyles.text,
                    hover && buttonPrimaryStyles.textHover,
                    active && buttonPrimaryStyles.textActive,
                    disabled && buttonPrimaryStyles.textDisabled,
                  ])
          ),
        variant === 'secondary' &&
          composeStyles(
            ...(error
              ? [
                  buttonSecondaryErrorStyle.text,
                  hover && buttonSecondaryErrorStyle.textHover,
                  active && buttonSecondaryErrorStyle.textActive,
                  disabled && buttonSecondaryErrorStyle.textDisabled,
                ]
              : [
                  buttonSecondaryStyles.text,
                  hover && buttonSecondaryStyles.textHover,
                  active && buttonSecondaryStyles.textActive,
                  disabled && buttonSecondaryStyles.textDisabled,
                ])
          ),
        variant === 'tertiary' &&
          composeStyles(
            ...(error
              ? [
                  buttonTertiaryErrorStyle.text,
                  hover && buttonTertiaryErrorStyle.textHover,
                  active && buttonTertiaryErrorStyle.textActive,
                  disabled && buttonTertiaryErrorStyle.textDisabled,
                ]
              : [
                  buttonTertiaryStyles.text,
                  hover && buttonTertiaryStyles.textHover,
                  active && buttonTertiaryStyles.textActive,
                  disabled && buttonTertiaryStyles.textDisabled,
                ])
          ),
        fontSizeStyles[['sm', 'md'].includes(size) ? 'sm' : 'md'],
        props.style
      )}
    />
  );
};
ButtonText.displayName = 'Button.Text';
