/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { createStyles, type ExtractForProps } from '@crossed/styled';
import { createButton } from '@crossed/primitive';
import { Pressable, type PressableProps } from 'react-native';
import { Text as TextUi, type TextProps } from '../typography/Text';
import { type GetProps, withDefaultProps } from '@crossed/core';
import { XBox } from '../layout/XBox';
import { Box } from '../layout/Box';
import { createContext, forwardRef, useContext } from 'react';
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
  () =>
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
              'base': { backgroundColor: '#4637ff', borderColor: '#4637ff' },
              ':hover': { backgroundColor: '#2606c0', borderColor: '#2606c0' },
              ':active': { backgroundColor: '#1e078f', borderColor: '#1e078f' },
            },
            secondary: {
              'base': { borderColor: '#4637ff' },
              ':hover': { backgroundColor: '#ebeaff' },
              ':active': { backgroundColor: '#dad9ea' },
            },
            tertiary: { base: {} },
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
              base: { color: '#4637ff' },
            },
            tertiary: {
              'base': { color: '#4637ff' },
              ':hover': { color: '#2606c0' },
              ':active': { color: '#1e078f' },
            },
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
const Root = forwardRef(
  ({ variant = 'primary', error = false, ...props }: RootProps, ref: any) => {
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
);

const Text = (props: TextProps) => {
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
    />
  );
};

const Element = Box;

const Button = createButton({
  Group,
  Root: withDefaultProps(Root, { variant: 'primary' }),
  Text,
  Element,
});

const { Text: ButtonText, Element: ButtonElement } = Button;

export { ButtonText, ButtonElement, Button };
export type ButtonProps = GetProps<typeof Button>;
