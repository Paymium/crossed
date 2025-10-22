/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { composeStyles } from '@crossed/styled';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { forwardRef, useId, useState } from 'react';
import {
  buttonOutlineStyle,
  buttonPrimaryErrorStyle,
  buttonPrimaryStyles,
  buttonPrimarySuccessStyle,
  buttonSecondaryErrorStyle,
  buttonSecondaryStyles,
  buttonSizeStyles,
  buttonStyle,
  buttonTertiaryErrorStyle,
  buttonTertiaryStyles,
} from './styles';
import { ButtonProps } from './types';
import { ButtonIcon } from './Icon';
import { buttonContext } from './context';
import { alignSelfStyle } from '../../styles/alignItems';

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      error,
      success,
      disabled,
      loading,
      children,
      alignSelf,
      ...props
    },
    ref
  ) => {
    const renderLoading = loading ? (
      <ButtonIcon>
        <ActivityIndicator />
      </ButtonIcon>
    ) : null;
    const id = useId();
    const [textId, setTextId] = useState(id);

    return (
      <Pressable
        aria-disabled={Boolean(disabled ?? false)}
        aria-labelledby={textId}
        role="button"
        tabIndex={disabled ? -1 : 0}
        disabled={disabled || loading}
        ref={ref}
        {...props}
        style={(e: any) =>
          composeStyles(
            buttonStyle,
            buttonOutlineStyle.default,
            size && buttonSizeStyles[size],
            alignSelf && alignSelfStyle[alignSelf],
            variant === 'primary' &&
              composeStyles(
                ...(error
                  ? [
                      buttonPrimaryErrorStyle.root,
                      buttonOutlineStyle.error,
                      disabled && buttonPrimaryErrorStyle.disabled,
                    ]
                  : success
                    ? [
                        buttonPrimarySuccessStyle.root,
                        buttonOutlineStyle.success,
                        disabled && buttonPrimarySuccessStyle.disabled,
                      ]
                    : [
                        buttonPrimaryStyles.root,
                        buttonOutlineStyle.primary,
                        disabled && buttonPrimaryStyles.disabled,
                      ])
              ),
            variant === 'secondary' &&
              composeStyles(
                ...(error
                  ? [
                      buttonSecondaryErrorStyle.root,
                      buttonOutlineStyle.error,
                      disabled && buttonSecondaryErrorStyle.disabled,
                    ]
                  : [
                      buttonSecondaryStyles.root,
                      buttonOutlineStyle.primary,
                      disabled && buttonSecondaryStyles.disabled,
                    ])
              ),
            variant === 'tertiary' &&
              composeStyles(
                ...(error
                  ? [buttonTertiaryErrorStyle.root, buttonOutlineStyle.error]
                  : [
                      buttonTertiaryStyles.root,
                      buttonOutlineStyle.primary,
                      disabled && buttonTertiaryStyles.disabled,
                    ])
              ),
            props.style
          ).rnw({
            hover: (!disabled && e.hovered) || loading,
            active: !disabled && !loading && e.pressed,
            disabled: disabled,
          }).style
        }
      >
        {(e: any) => {
          return (
            <>
              <buttonContext.Provider
                value={{
                  variant,
                  size,
                  state: {
                    active: e.pressed,
                    hover: e.hovered || loading,
                  },
                  disabled: disabled,
                  textId,
                  setTextId,
                  error,
                  success,
                }}
              >
                {renderLoading}
                {typeof children === 'function' ? children(e) : children}
              </buttonContext.Provider>
            </>
          );
        }}
      </Pressable>
    );
  }
);
Button.displayName = 'Button';
