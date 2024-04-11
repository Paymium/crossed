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
import { Pressable, View, type PressableProps } from 'react-native';
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
  Pick<RootProps, 'variant' | 'error'> & {
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
        variants: {
          variant: {
            primary: {
              'base': { backgroundColor: '#ef4444', borderColor: '#ef4444' },
              ':hover': { backgroundColor: '#d73636', borderColor: '#d73636' },
              ':active': { backgroundColor: '#b42221', borderColor: '#b42221' },
            },
            secondary: {
              'base': { borderColor: '#ef4444' },
              ':hover': { borderColor: '#d73636' },
              ':active': { borderColor: '#b42221' },
            },
            tertiary: { base: {} },
            false: {},
          },
        },
      },
      errorText: {
        variants: {
          variant: {
            primary: { base: { color: 'white' } },
            secondary: {
              'base': { color: '#ef4444' },
              ':hover': { color: '#d73636' },
              ':active': { color: '#b42221' },
            },
            tertiary: {
              'base': { color: '#ef4444' },
              ':hover': { color: '#d73636' },
              ':active': { color: '#b42221' },
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
          borderColor: 'transparent',
          height: 56,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        variants: {
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
            },
            secondary: {
              'base': { borderColor: t.colors.primary.default },
              ':hover': { backgroundColor: t.colors.neutral.hover },
              ':active': { backgroundColor: t.colors.neutral.active },
            },
            tertiary: { base: {} },
            false: {},
          },
        },
      },
      text: {
        base: { fontWeight: 'bold' },
        variants: {
          variant: {
            primary: {
              base: { color: 'white' },
            },
            secondary: {
              base: { color: t.colors.primary.default },
            },
            tertiary: {
              'base': { color: t.colors.primary.default },
              ':hover': { color: t.colors.primary.hover },
              ':active': { color: t.colors.primary.active },
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
  Omit<VariantButton, 'variants'> & { error?: boolean };
const Root = withReactive(
  forwardRef<View, RootProps>(
    ({ variant = 'primary', error = false, ...props }, ref) => {
      const { state, props: handleProps } = useInteraction(props);
      return (
        <buttonContext.Provider value={{ variant, error, state }}>
          <Pressable
            ref={ref}
            {...props}
            {...handleProps}
            style={
              useButton.root.rnw({
                ...props,
                ...state,
                style: error
                  ? useButton.error.rnw({
                      ...props,
                      ...state,
                      variants: { variant },
                    }).style
                  : props.style,
                variants: { variant },
              }).style
            }
          />
        </buttonContext.Provider>
      );
    }
  )
);

const Text = withReactive(
  forwardRef<any, TextProps>((props, ref) => {
    const { variant, error, state } = useContext(buttonContext);
    return (
      <TextUi
        weight="semibold"
        {...props}
        style={
          useButton.text.rnw({
            ...props,
            ...state,
            style: error
              ? useButton.errorText.rnw({
                  ...props,
                  ...state,
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
  const { variant, error, state } = useContext(buttonContext);
  const color = useMemo(() => {
    return useButton.text.style({
      ...state,
      style:
        error &&
        useButton.errorText.style({
          ...state,
          variants: { variant },
        }).style,
      variants: { variant },
    }).style.color as string;
  }, [variant, error, state]);
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
