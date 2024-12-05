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
import {
  buttonErrorStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonSizeStyles,
  buttonSuccessStyles,
  buttonTertiaryStyles,
} from './styles';
import { ButtonProps } from './types';
import { ButtonIcon } from './Icon';
import { buttonContext } from './context';
import { alignSelfStyle } from '../../styles/alignItems';

export const Button = withReactive(
  forwardRef<View, ButtonProps>(
    (
      {
        variant = 'primary',
        disabled,
        loading,
        size = 'md',
        children,
        alignSelf,
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
          // @ts-expect-error should update react and react-native
          tabIndex={disabled ? -1 : 0}
          disabled={disabled || loading}
          ref={ref}
          {...props}
          style={(e: any) =>
            composeStyles(
              buttonSizeStyles.default,
              size && buttonSizeStyles[size],
              alignSelf && alignSelfStyle[alignSelf],
              variant === 'primary' && buttonPrimaryStyles.root,
              variant === 'secondary' && buttonSecondaryStyles.root,
              variant === 'tertiary' && buttonTertiaryStyles.root,
              variant === 'error' && buttonErrorStyles.root,
              variant === 'success' && buttonSuccessStyles.root,
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
                  size,
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
