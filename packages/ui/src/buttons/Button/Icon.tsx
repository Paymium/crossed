/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, CrossedMethods } from '@crossed/styled';
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useContext,
} from 'react';
import { buttonContext } from './context';
import {
  buttonPrimaryErrorStyle,
  buttonPrimaryStyles,
  buttonSecondaryErrorStyle,
  buttonSecondaryStyles,
  buttonTertiaryErrorStyle,
  buttonTertiaryStyles,
  textStyles,
} from './styles';

export const ButtonIcon = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  const { variant, state, disabled, error } = useContext(buttonContext);
  const { hover, active } = state;

  const color = composeStyles(
    textStyles.default,
    variant === 'primary' &&
      composeStyles(
        ...(!error
          ? [
              buttonPrimaryStyles.text,
              hover && buttonPrimaryStyles.textHover,
              active && buttonPrimaryStyles.textActive,
            ]
          : [
              buttonPrimaryErrorStyle.text,
              hover && buttonPrimaryErrorStyle.textHover,
              active && buttonPrimaryErrorStyle.textActive,
            ])
      ),
    variant === 'secondary' &&
      composeStyles(
        ...(!error
          ? [
              buttonSecondaryStyles.text,
              hover && buttonSecondaryStyles.textHover,
              active && buttonSecondaryStyles.text,
            ]
          : [
              buttonSecondaryErrorStyle.text,
              hover && buttonSecondaryErrorStyle.textHover,
              active && buttonSecondaryErrorStyle.textActive,
            ])
      ),
    variant === 'tertiary' &&
      composeStyles(
        ...(!error
          ? [
              buttonTertiaryStyles.text,
              hover && buttonTertiaryStyles.textHover,
              active && buttonTertiaryStyles.textActive,
            ]
          : [
              buttonTertiaryErrorStyle.text,
              hover && buttonTertiaryErrorStyle.textHover,
              active && buttonTertiaryErrorStyle.textActive,
            ])
      ),
    disabled && textStyles.disabled,
    style
  ).style(state).style.color;

  return isValidElement(children)
    ? cloneElement(children, { color } as any)
    : children;
};
ButtonIcon.displayName = 'Button.Icon';
