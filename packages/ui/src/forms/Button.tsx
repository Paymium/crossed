/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  createStyles,
  withReactive,
  type ExtractForProps,
} from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
} from 'react-native';
import { Text as TextUi, type TextProps } from '../typography/Text';
import { type GetProps, withDefaultProps } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Box } from '../layout/Box';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useInteraction } from '@crossed/styled/plugins';

const buttonContext = createContext<
  Pick<RootProps, 'variant' | 'error' | 'disabled'> & {
    state?: {
      active?: boolean;
      hover?: boolean;
    };
  }
>({});

export const useButton = createStyles(
  (t) =>
    ({
      error: {
        web: {
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            outlineColor: '#EF4444',
          },
        },
        variants: {
          variant: {
            primary: {
              'base': { backgroundColor: '#ef4444', borderColor: '#ef4444' },
              ':hover': { backgroundColor: '#d73636', borderColor: '#d73636' },
              ':active': { backgroundColor: '#b42221', borderColor: '#b42221' },
              ':focus': {
                backgroundColor: '#b42221',
                borderColor: '#b42221',
              },
              ':disabled': {
                backgroundColor: '#FAA4A3',
                borderColor: '#FAA4A3',
              },
            },
            secondary: {
              'base': { borderColor: '#ef4444' },
              ':hover': { borderColor: '#d73636' },
              ':active': { borderColor: '#b42221' },
              ':disabled': { borderColor: '#FAA4A3' },
            },
            tertiary: { base: {} },
            false: {},
          },
        },
      },
      errorText: {
        variants: {
          variant: {
            primary: {
              base: { color: 'white' },
            },
            secondary: {
              'base': { color: '#ef4444' },
              ':hover': { color: '#d73636' },
              ':active': { color: '#b42221' },
              ':disabled': { color: '#FAA4A3' },
            },
            tertiary: {
              'base': { color: '#ef4444' },
              ':hover': { color: '#d73636' },
              ':active': { color: '#b42221' },
              ':disabled': { color: '#FAA4A3' },
            },
            false: {},
          },
        },
      },
      root: {
        base: {
          display: 'flex',
          paddingHorizontal: 16,
          borderRadius: 7,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          gap: 8,
        },
        web: {
          'base': {
            boxSizing: 'border-box',
          },
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            outlineColor: '#9088F7',
          },
        },
        variants: {
          size: {
            false: { base: { height: 'auto' } },
            true: { base: { height: 44 } },
          },
          variant: {
            primary: {
              'base': {
                backgroundColor: t.colors.primary.default,
                borderColor: t.colors.primary.default,
              },
              ':hover': {
                backgroundColor: t.colors.primary.hover,
                borderColor: t.colors.primary.hover,
              },
              ':active': {
                backgroundColor: t.colors.primary.active,
                borderColor: t.colors.primary.active,
              },
              ':disabled': {
                backgroundColor: t.colors.primary.disabled,
                borderColor: t.colors.primary.disabled,
              },
            },
            secondary: {
              'base': { borderColor: t.colors.primary.default },
              ':hover': { backgroundColor: t.colors.neutral.hover },
              ':active': { backgroundColor: t.colors.neutral.active },
              ':disabled': {
                borderColor: t.colors.primary.disabled,
              },
            },
            tertiary: {},
            false: {},
          },
        },
      },
      text: {
        base: { fontWeight: 'bold' },
        variants: {
          variant: {
            primary: {
              'base': { color: 'white' },
              ':disabled': { color: t.colors.neutral.disabled },
            },
            secondary: {
              'base': { color: t.colors.primary.default },
              ':disabled': { color: t.colors.primary.disabled },
            },
            tertiary: {
              'base': { color: t.colors.primary.default },
              ':hover': { color: t.colors.primary.hover },
              ':active': { color: t.colors.primary.active },
              ':disabled': { color: t.colors.primary.disabled },
            },
            false: {},
          },
        },
      },
    } as const)
);

const Group = XBox;

type VariantButton = ExtractForProps<typeof useButton.root>;
type RootProps = PressableProps &
  VariantButton['variants'] &
  Omit<VariantButton, 'variants'> & { error?: boolean; loading?: boolean };
const Root = withReactive(
  forwardRef<View, RootProps>(
    (
      {
        variant = 'primary',
        size = true,
        error = false,
        disabled,
        loading,
        children,
        ...props
      },
      ref
    ) => {
      const { state, props: handleProps } = useInteraction(props);
      const renderLoading = loading ? (
        <ButtonIcon>
          <ActivityIndicator />
        </ButtonIcon>
      ) : null;
      return (
        <buttonContext.Provider
          value={{ variant, error, state, disabled: disabled || loading }}
        >
          <Pressable
            disabled={disabled || loading}
            ref={ref}
            {...props}
            {...handleProps}
            style={
              useButton.root.rnw({
                ...props,
                ...state,
                disabled: disabled || loading,
                style: error
                  ? useButton.error.rnw({
                      ...props,
                      ...state,
                      disabled: disabled || loading,
                      variants: { variant },
                    }).style
                  : props.style,
                variants: { variant, size },
              }).style
            }
          >
            {typeof children === 'function' ? (
              (e) => (
                <>
                  {renderLoading}
                  {children(e)}
                </>
              )
            ) : (
              <>
                {renderLoading}
                {children}
              </>
            )}
          </Pressable>
        </buttonContext.Provider>
      );
    }
  )
);

const Text = withReactive(
  forwardRef<any, TextProps>((props, ref) => {
    const { variant, error, state, disabled } = useContext(buttonContext);
    return (
      <TextUi
        weight="semibold"
        {...props}
        style={
          useButton.text.rnw({
            ...props,
            ...state,
            disabled,
            style: error
              ? useButton.errorText.rnw({
                  ...props,
                  ...state,
                  disabled,
                  variants: { variant },
                }).style
              : props.style,
            variants: { variant },
          }).style
        }
        ref={ref}
      />
    );
  })
);

const ButtonIcon = ({ children }: PropsWithChildren) => {
  const { variant, error, state, disabled } = useContext(buttonContext);
  const color = useMemo(() => {
    return useButton.text.style({
      ...state,
      disabled,
      style:
        error &&
        useButton.errorText.style({
          ...state,
          disabled,
          variants: { variant },
        }).style,
      variants: { variant },
    }).style.color as string;
  }, [variant, error, state, disabled]);
  return isValidElement(children)
    ? cloneElement(children, { color } as any)
    : children;
};

const Element = Box;

const Button = createButton({
  Group,
  Root: withDefaultProps(Root, { variant: 'primary' }),
  Text,
  Element,
});

const { Text: ButtonText, Element: ButtonElement } = Button;

export { ButtonText, ButtonElement, Button, ButtonIcon };
export type ButtonProps = GetProps<typeof Button>;
