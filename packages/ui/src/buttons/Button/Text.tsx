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
  buttonPrimaryErrorStyle,
  buttonPrimaryStyles,
  buttonSecondaryErrorStyle,
  buttonSecondaryStyles,
  buttonTertiaryErrorStyle,
  buttonTertiaryStyles,
  textStyles,
} from './styles';
import { Text as TextNative } from 'react-native';
import { fontSizeStyles } from '../../styles';

type ButtonTextProps = TextProps;

const ButtonText = forwardRef<TextNative, ButtonTextProps>((props, ref) => {
  const { variant, state, disabled, setTextId, textId, error, size } =
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
            ...(!error
              ? [
                  buttonPrimaryStyles.text,
                  hover && buttonPrimaryStyles.textHover,
                  active && buttonPrimaryStyles.textActive,
                  disabled && buttonPrimaryStyles.textDisabled,
                ]
              : [
                  buttonPrimaryErrorStyle.text,
                  hover && buttonPrimaryErrorStyle.textHover,
                  active && buttonPrimaryErrorStyle.textActive,
                  disabled && buttonPrimaryErrorStyle.textDisabled,
                ])
          ),
        variant === 'secondary' &&
          composeStyles(
            ...(!error
              ? [
                  buttonSecondaryStyles.text,
                  hover && buttonSecondaryStyles.textHover,
                  active && buttonSecondaryStyles.textActive,
                  disabled && buttonSecondaryStyles.textDisabled,
                ]
              : [
                  buttonSecondaryErrorStyle.text,
                  hover && buttonSecondaryErrorStyle.textHover,
                  active && buttonSecondaryErrorStyle.textActive,
                  disabled && buttonSecondaryErrorStyle.textDisabled,
                ])
          ),
        variant === 'tertiary' &&
          composeStyles(
            ...(!error
              ? [
                  buttonTertiaryStyles.text,
                  hover && buttonTertiaryStyles.textHover,
                  active && buttonTertiaryStyles.textActive,
                  disabled && buttonTertiaryStyles.textDisabled,
                ]
              : [
                  buttonTertiaryErrorStyle.text,
                  hover && buttonTertiaryErrorStyle.textHover,
                  active && buttonTertiaryErrorStyle.textActive,
                  disabled && buttonTertiaryErrorStyle.textDisabled,
                ])
          ),
        fontSizeStyles[['sm', 'md'].includes(size) ? 'sm' : 'md'],
        props.style
      )}
      ref={ref}
    />
  );
});
ButtonText.displayName = 'Button.Text';

export { ButtonText, type ButtonTextProps };
