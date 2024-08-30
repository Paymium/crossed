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

const buttonContext = createContext<
  Pick<RootProps, 'variant' | 'error' | 'disabled'> & {
    state?: {
      active?: boolean;
      hover?: boolean;
    };
  }
>({});

export const textStyles = createStyles((t) => ({
  default: {
    'base': { fontWeight: 'bold' },
    ':disabled': { pointerEvents: 'none' },
  },
  primary: {
    'base': { color: t.components.Action.primary.default.text },
    ':hover': { color: t.components.Action.primary.hover.text },
    ':active': { color: t.components.Action.primary.active.text },
    ':disabled': { color: t.components.Action.primary.disabled.text },
  },
  secondary: {
    'base': { color: t.components.Action.secondary.default.text },
    ':hover': { color: t.components.Action.secondary.hover.text },
    ':active': { color: t.components.Action.secondary.active.text },
    ':disabled': { color: t.components.Action.secondary.disabled.text },
  },
  tertiary: {
    'base': { color: t.components.Action.tertiary.default.text },
    ':hover': { color: t.components.Action.tertiary.hover.text },
    ':active': { color: t.components.Action.tertiary.active.text },
    ':disabled': { color: t.components.Action.tertiary.disabled.text },
  },
  false: {},
}));

const textErrorStyles = createStyles((t) => ({
  primary: {
    base: { color: 'white' },
  },
  secondary: {
    'base': { color: t.colors.error.primary },
    ':hover': { color: t.colors.error.muted },
    ':active': { color: t.colors.error.satured },
    ':disabled': { color: t.colors.error.hight },
  },
  tertiary: {
    'base': { color: t.colors.error.primary },
    ':hover': { color: t.colors.error.muted },
    ':active': { color: t.colors.error.satured },
    ':disabled': { color: t.colors.error.hight },
  },
  false: {},
}));

export const useButton = createStyles(
  (t) =>
    ({
      error: {
        web: {
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            outlineColor: t.colors.error.primary,
          },
        },
        variants: {
          variant: {
            primary: {
              'base': {
                backgroundColor: t.colors.error.primary,
                borderColor: t.colors.error.primary,
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
              'base': {
                borderColor: t.colors.error.primary,
                backgroundColor: t.colors.error.low,
              },
              ':hover': {
                borderColor: t.colors.error.muted,
                backgroundColor: t.colors.error.low,
              },
              ':active': {
                borderColor: t.colors.error.satured,
                backgroundColor: t.colors.error.hight,
              },
              ':disabled': { borderColor: t.colors.error.hight },
            },
            tertiary: { base: {} },
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
            outlineColor: t.components.Action.primary.default.background,
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
                backgroundColor: t.components.Action.primary.default.background,
                borderColor: t.components.Action.primary.default.background,
              },
              ':hover': {
                backgroundColor: t.components.Action.primary.hover.background,
                borderColor: t.components.Action.primary.hover.background,
              },
              ':active': {
                backgroundColor: t.components.Action.primary.active.background,
                borderColor: t.components.Action.primary.active.background,
              },
              ':disabled': {
                backgroundColor:
                  t.components.Action.primary.disabled.background,
                borderColor: t.components.Action.primary.disabled.background,
              },
            },
            secondary: {
              'base': {
                borderColor: t.components.Action.secondary.default.border,
                backgroundColor:
                  t.components.Action.secondary.default.background,
              },
              ':hover': {
                borderColor: t.components.Action.secondary.hover.border,
                backgroundColor: t.components.Action.secondary.hover.background,
              },
              ':active': {
                borderColor: t.components.Action.secondary.active.border,
                backgroundColor:
                  t.components.Action.secondary.active.background,
              },
              ':disabled': {
                borderColor: t.components.Action.secondary.disabled.border,
                backgroundColor:
                  t.components.Action.secondary.disabled.background,
              },
            },
            tertiary: {
              'base': {
                borderColor: t.components.Action.tertiary.default.border,
                backgroundColor:
                  t.components.Action.tertiary.default.background,
              },
              ':hover': {
                borderColor: t.components.Action.tertiary.hover.border,
                backgroundColor: t.components.Action.tertiary.hover.background,
              },
              ':active': {
                borderColor: t.components.Action.tertiary.active.border,
                backgroundColor: t.components.Action.tertiary.active.background,
              },
              ':disabled': {
                borderColor: t.components.Action.tertiary.disabled.border,
                backgroundColor:
                  t.components.Action.tertiary.disabled.background,
              },
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
      // const { state, props: handleProps } = useInteraction(props);
      const renderLoading = loading ? (
        <ButtonIcon>
          <ActivityIndicator />
        </ButtonIcon>
      ) : null;
      return (
        <Pressable
          disabled={disabled || loading}
          ref={ref}
          {...props}
          // {...handleProps}
          style={(e: any) =>
            composeStyles(useButton.root, error && useButton.error).rnw({
              ...props,
              hover: e.hovered,
              active: e.pressed,
              disabled: disabled || loading,
              variants: { size, variant },
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

const Text = withReactive(
  forwardRef<any, TextProps>((props, ref) => {
    const { variant, error, state, disabled } = useContext(buttonContext);

    return (
      <TextUi
        weight="lg"
        {...props}
        disabled={disabled}
        {...state}
        style={composeStyles(
          textStyles.default,
          textStyles[(variant || '').toString()],
          error && textErrorStyles[(variant || '').toString()],
          props.style
        )}
        ref={ref}
      />
    );
  })
);

const Icon = ({ children }: PropsWithChildren) => {
  const { variant, error, state, disabled } = useContext(buttonContext);
  const color = useMemo(() => {
    return composeStyles(
      textStyles.default,
      textStyles[(variant || '').toString()],
      error && textErrorStyles[(variant || '').toString()]
    ).style({ ...state, disabled }).style.color as string;
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
  Icon,
});

const { Text: ButtonText, Element: ButtonElement, Icon: ButtonIcon } = Button;

export { ButtonText, ButtonElement, Button, ButtonIcon };
export type ButtonProps = GetProps<typeof Button>;
export type ButtonTextProps = GetProps<typeof ButtonText>;
