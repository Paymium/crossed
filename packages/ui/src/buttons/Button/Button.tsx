/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { composeStyles, inlineStyle, useTheme } from '@crossed/styled';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef, useId, useState } from 'react';
import {
  buttonOutlineStyle,
  buttonPrimaryErrorStyle,
  buttonPrimaryStyles,
  buttonSecondaryErrorStyle,
  buttonSecondaryStyles,
  buttonSizeStyles,
  buttonStyle,
  buttonTertiaryStyles,
} from './styles';
import { ButtonProps } from './types';
import { ButtonIcon } from './Icon';
import { buttonContext } from './context';
import { alignSelfStyle } from '../../styles/alignItems';
import { Box } from '../../layout';

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      error,
      disabled,
      loading,
      children,
      alignSelf,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const { colors } = useTheme();
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
      >
        {(e: any) => {
          return (
            <>
              {/*outline*/}
              <Box
                style={composeStyles(
                  e.pressed && buttonOutlineStyle.default,
                  error ? buttonOutlineStyle.error : buttonOutlineStyle.primary
                )}
              />
              {/*premier border*/}
              <LinearGradient
                // colors={colors.gradient.brand.1}
                colors={colors.gradient.brand['2']}
                {...inlineStyle(() => ({
                  base: {
                    padding: 1,
                    borderTopLeftRadius: 9,
                    borderTopRightRadius: 9,
                    borderBottomLeftRadius: 9,
                    borderBottomRightRadius: 9,
                    position: 'relative',
                  },
                })).rnw()}
              >
                {/*deuxieme border*/}
                <LinearGradient
                  colors={['#4754da', '#2e3dcb']}
                  {...inlineStyle(() => ({
                    base: {
                      padding: 1,
                      borderTopLeftRadius: 9,
                      borderTopRightRadius: 9,
                      borderBottomLeftRadius: 9,
                      borderBottomRightRadius: 9,
                    },
                  })).rnw()}
                >
                  <View
                    {...composeStyles(
                      buttonStyle,
                      size && buttonSizeStyles[size],
                      alignSelf && alignSelfStyle[alignSelf],
                      variant === 'primary' &&
                        composeStyles(
                          ...(error
                            ? [
                                buttonPrimaryErrorStyle.root,
                                disabled && buttonPrimaryErrorStyle.disabled,
                              ]
                            : [
                                buttonPrimaryStyles.root,
                                disabled && buttonPrimaryStyles.disabled,
                              ])
                        ),
                      variant === 'secondary' &&
                        composeStyles(
                          ...(!error
                            ? [
                                buttonSecondaryStyles.root,
                                disabled && buttonSecondaryStyles.disabled,
                              ]
                            : [
                                buttonSecondaryErrorStyle.root,
                                disabled && buttonSecondaryErrorStyle.disabled,
                              ])
                        ),
                      variant === 'tertiary' &&
                        composeStyles(
                          ...(!error ? [buttonTertiaryStyles.root] : [])
                        )
                    ).rnw({
                      hover: (!disabled && e.hovered) || loading,
                      active: !disabled && !loading && e.pressed,
                      disabled: disabled,
                    })}
                  >
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
                      }}
                    >
                      {renderLoading}
                      {typeof children === 'function' ? children(e) : children}
                    </buttonContext.Provider>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </>
          );
        }}
      </Pressable>
    );
  }
);
Button.displayName = 'Button';
