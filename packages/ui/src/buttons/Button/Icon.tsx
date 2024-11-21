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
  useMemo,
} from 'react';
import { buttonContext } from './context';
import {
  buttonErrorStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonSuccessStyles,
  buttonTertiaryStyles,
  textStyles,
} from './styles';

export const ButtonIcon = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  const { variant, state, disabled } = useContext(buttonContext);
  const { hover, active } = state;

  const color = useMemo(() => {
    return composeStyles(
      textStyles.default,
      variant === 'primary' && buttonPrimaryStyles.text,
      variant === 'primary' && hover && buttonPrimaryStyles.textHover,
      variant === 'primary' && active && buttonPrimaryStyles.textActive,
      variant === 'secondary' && buttonSecondaryStyles.text,
      variant === 'secondary' && hover && buttonSecondaryStyles.textHover,
      variant === 'secondary' && active && buttonSecondaryStyles.text,
      variant === 'tertiary' && buttonTertiaryStyles.textActive,
      variant === 'tertiary' && hover && buttonTertiaryStyles.textHover,
      variant === 'tertiary' && active && buttonTertiaryStyles.textActive,
      variant === 'error' && buttonErrorStyles.text,
      variant === 'success' && buttonSuccessStyles.text,
      disabled && textStyles.disabled,
      style
    ).style(state).style.color;
  }, [variant, state]);

  return isValidElement(children)
    ? cloneElement(children, { color } as any)
    : children;
};
ButtonIcon.displayName = 'Button.Icon';
