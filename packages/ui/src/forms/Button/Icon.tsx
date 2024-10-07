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
  textDisabledStyles,
  textErrorDisabledStyles,
  textErrorStyles,
  textStyles,
} from './styles';

export const ButtonIcon = ({
  children,
  style,
}: PropsWithChildren<{ style?: CrossedMethods<any> }>) => {
  const { variant, error, state, disabled } = useContext(buttonContext);

  const color = useMemo(() => {
    return composeStyles(
      textStyles.default,
      variant && textStyles[variant],
      disabled && textStyles.disabled,
      disabled && variant && textDisabledStyles[variant],
      variant && error && textErrorStyles[variant],
      disabled && variant && error && textErrorDisabledStyles[variant],
      style
    ).style(state).style.color;
  }, [variant, error, disabled, state]);

  return isValidElement(children)
    ? cloneElement(children, { color } as any)
    : children;
};
ButtonIcon.displayName = 'Button.Icon';
