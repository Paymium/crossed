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
  buttonErrorStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonSuccessStyles,
  buttonTertiaryStyles,
  textStyles,
} from './styles';
import { Text as TextNative } from 'react-native';

type ButtonTextProps = TextProps;

const ButtonText = forwardRef<TextNative, ButtonTextProps>((props, ref) => {
  const { variant, state, disabled, setTextId, textId } =
    useContext(buttonContext);

  const { hover, active } = state || {};

  useEffect(() => {
    if (props.id && textId !== props.id) {
      setTextId(props.id);
    }
  }, [props.id, textId, setTextId]);

  return (
    <Text
      fontWeight={'lg'}
      {...props}
      id={textId}
      style={composeStyles(
        textStyles.default,
        variant === 'primary' && buttonPrimaryStyles.text,
        variant === 'primary' && hover && buttonPrimaryStyles.textHover,
        variant === 'primary' && active && buttonPrimaryStyles.textActive,
        variant === 'secondary' && buttonSecondaryStyles.text,
        variant === 'secondary' && hover && buttonSecondaryStyles.textHover,
        variant === 'secondary' && active && buttonSecondaryStyles.text,
        variant === 'tertiary' && buttonTertiaryStyles.text,
        variant === 'tertiary' && hover && buttonTertiaryStyles.textHover,
        variant === 'tertiary' && active && buttonTertiaryStyles.textActive,
        variant === 'error' && buttonErrorStyles.text,
        variant === 'success' && buttonSuccessStyles.text,
        disabled && textStyles.disabled,
        props.style
      )}
      ref={ref}
    />
  );
});
ButtonText.displayName = 'Button.Text';

export { ButtonText, type ButtonTextProps };
