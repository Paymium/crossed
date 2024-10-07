/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { composeStyles, withReactive } from '@crossed/styled';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { forwardRef, useId, useState } from 'react';
import { buttonErrorStyles, buttonSizeStyles, buttonStyles } from './styles';
import { ButtonProps } from './types';
import { ButtonIcon } from './Icon';
import { buttonContext } from './context';

export const Button = withReactive(
  forwardRef<View, ButtonProps>(
    (
      {
        variant = 'primary',
        error = false,
        disabled,
        loading,
        size = true,
        children,
        ...props
      }: ButtonProps,
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
              buttonStyles.root,
              buttonSizeStyles[size.toString()],
              variant && buttonStyles[variant],
              (disabled || loading) &&
                variant &&
                buttonStyles[variant][':disabled'] && {
                  base: buttonStyles[variant][':disabled'],
                },
              error && buttonErrorStyles.error,
              variant && error && buttonErrorStyles[variant],
              (disabled || loading) &&
                variant &&
                error &&
                buttonErrorStyles[variant][':disabled'] && {
                  base: buttonErrorStyles[variant][':disabled'],
                },
              props.style
            ).rnw({
              hover: e.hovered,
              active: e.pressed,
              disabled: disabled || loading,
            }).style
          }
        >
          {(e: any) => {
            return (
              <buttonContext.Provider
                value={{
                  variant,
                  error,
                  state: { active: e.pressed, hover: e.hovered },
                  disabled: disabled || loading,
                  textId,
                  setTextId,
                }}
              >
                {renderLoading}
                {typeof children === 'function' ? children(e) : children}
              </buttonContext.Provider>
            );
          }}
        </Pressable>
      );
    }
  )
);
Button.displayName = 'Button';
