/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  composeStyles,
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
            outlineColor: t.colors.error.bright,
          },
        },
        variants: {
          variant: {
            primary: {
              'base': {
                backgroundColor: t.colors.error.bright,
                borderColor: t.colors.error.bright,
              },
              ':hover': {
                backgroundColor: t.colors.error.muted,
                borderColor: t.colors.error.muted,
              },
              ':active': {
                backgroundColor: t.colors.error.satured,
                borderColor: t.colors.error.satured,
              },
              ':disabled': {
                backgroundColor: t.colors.error.hight,
                borderColor: t.colors.error.hight,
              },
            },
            secondary: {
              'base': { borderColor: t.colors.error.bright },
              ':hover': { borderColor: t.colors.error.muted },
              ':active': { borderColor: t.colors.error.satured },
              ':disabled': { borderColor: t.colors.error.hight },
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
              'base': { color: t.colors.error.bright },
              ':hover': { color: t.colors.error.muted },
              ':active': { color: t.colors.error.satured },
              ':disabled': { color: t.colors.error.hight },
            },
            tertiary: {
              'base': { color: t.colors.error.bright },
              ':hover': { color: t.colors.error.muted },
              ':active': { color: t.colors.error.satured },
              ':disabled': { color: t.colors.error.hight },
            },
            false: {},
          },
        },
      },
      root: {
        base: {
          display: 'flex',
          paddingHorizontal: t.space.xs,
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
            outlineColor: t.colors.brand.hight,
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
                backgroundColor: t.colors.brand.bright,
                borderColor: t.colors.brand.bright,
              },
              ':active': {
                backgroundColor: t.colors.brand.satured,
                borderColor: t.colors.brand.satured,
              },
              ':hover': {
                backgroundColor: t.colors.brand.muted,
                borderColor: t.colors.brand.muted,
              },
              ':disabled': {
                backgroundColor: t.colors.brand.hight,
                borderColor: t.colors.brand.hight,
              },
            },
            secondary: {
              'base': { borderColor: t.colors.brand.bright },
              ':hover': { backgroundColor: t.colors.neutral[300] },
              ':active': { backgroundColor: t.colors.neutral[400] },
              ':disabled': { borderColor: t.colors.brand.hight },
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
              ':disabled': { color: t.colors.neutral[400] },
            },
            secondary: {
              'base': { color: t.colors.brand.bright },
              ':disabled': { color: t.colors.brand.hight },
            },
            tertiary: {
              'base': { color: t.colors.brand.bright },
              ':hover': { color: t.colors.brand.muted },
              ':active': { color: t.colors.brand.satured },
              ':disabled': { color: t.colors.brand.hight },
            },
            false: {},
          },
        },
      },
    }) as const
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
            {...composeStyles(useButton.root, error && useButton.error).rnw({
              ...props,
              ...state,
              disabled: disabled || loading,
              variants: { size, variant },
            })}
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
        weight="lg"
        {...props}
        {...composeStyles(useButton.text, error && useButton.errorText).rnw({
          ...props,
          ...state,
          disabled,
          variants: { variant },
        })}
        ref={ref}
      />
    );
  })
);

const ButtonIcon = ({ children }: PropsWithChildren) => {
  const { variant, error, state, disabled } = useContext(buttonContext);
  const color = useMemo(() => {
    return composeStyles(useButton.text, error && useButton.errorText).style({
      ...state,
      disabled,
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
export type ButtonTextProps = GetProps<typeof ButtonText>;
