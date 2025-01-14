/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, type StyleSheet } from '@crossed/styled';

type RequiredKeys = {
  root: StyleSheet;
  text: StyleSheet;
  textHover: StyleSheet;
  textActive: StyleSheet;
};

export const buttonSizeStyles = createStyles(({ space }) => ({
  default: {
    ':disabled': { opacity: 0.5 },
    web: {
      'base': { boxSizing: 'border-box' },
      ':focus-visible': {
        outlineWidth: '2px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
      },
    },
    base: {
      display: 'flex',
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
  },
  sm: { base: { height: 32, paddingHorizontal: space.xs } },
  md: { base: { height: 44, paddingHorizontal: space.md } },
  lg: { base: { height: 52, paddingHorizontal: space.lg } },
}));
export const buttonPrimaryStyles = createStyles(
  ({ components: { Action } }) =>
    ({
      root: {
        'base': {
          backgroundColor: Action.primary.default.background,
          borderColor: Action.primary.default.background,
        },
        ':hover': {
          backgroundColor: Action.primary.hover.background,
          borderColor: Action.primary.hover.background,
        },
        ':active': {
          backgroundColor: Action.primary.active.background,
          borderColor: Action.primary.active.background,
        },
        'web': {
          ':focus-visible': {
            outlineColor: Action.primary.focus.border,
          },
        },
      },
      text: { 'base': { color: Action.primary.default.text } },
      textHover: { 'base': { color: Action.primary.hover.text } },
      textActive: { 'base': { color: Action.primary.active.text } },
    }) satisfies RequiredKeys
);

export const buttonSecondaryStyles = createStyles(
  ({ components: { Action } }) =>
    ({
      root: {
        'base': {
          borderColor: Action.secondary.default.border,
          backgroundColor: Action.secondary.default.background,
        },
        ':hover': {
          borderColor: Action.secondary.hover.border,
          backgroundColor: Action.secondary.hover.background,
        },
        ':active': {
          borderColor: Action.secondary.active.border,
          backgroundColor: Action.secondary.active.background,
        },
        'web': {
          ':focus-visible': {
            outlineColor: Action.secondary.focus.border,
          },
        },
      },
      text: { 'base': { color: Action.secondary.default.text } },
      textHover: { 'base': { color: Action.secondary.hover.text } },
      textActive: { 'base': { color: Action.secondary.active.text } },
    }) satisfies RequiredKeys
);

export const buttonTertiaryStyles = createStyles(
  ({ components: { Action } }) =>
    ({
      root: {
        'base': {
          borderColor: Action.tertiary.default.border,
          backgroundColor: Action.tertiary.default.background,
        },
        ':hover': {
          borderColor: Action.tertiary.hover.border,
          backgroundColor: Action.tertiary.hover.background,
        },
        ':active': {
          borderColor: Action.tertiary.active.border,
          backgroundColor: Action.tertiary.active.background,
        },
        'web': {
          ':focus-visible': {
            outlineColor: Action.tertiary.focus.border,
            backgroundColor: Action.tertiary.focus.background,
          },
        },
      },
      text: { 'base': { color: Action.tertiary.default.text } },
      textHover: { 'base': { color: Action.tertiary.hover.text } },
      textActive: { 'base': { color: Action.tertiary.active.text } },
    }) satisfies RequiredKeys
);

export const buttonSuccessStyles = createStyles(
  ({ colors }) =>
    ({
      root: {
        'base': {
          borderColor: colors.success.primary,
          backgroundColor: colors.success.primary,
        },
        ':hover': {
          borderColor: colors.success.dark,
          backgroundColor: colors.success.dark,
        },
        ':active': {
          borderColor: colors.success.dark,
          backgroundColor: colors.success.dark,
        },
        'web': {
          ':focus-visible': {
            outlineColor: colors.success.primary,
          },
        },
      },
      text: { 'base': { color: colors.white } },
      textHover: {},
      textActive: {},
    }) satisfies RequiredKeys
);

export const buttonErrorStyles = createStyles(
  ({ colors }) =>
    ({
      root: {
        'base': {
          backgroundColor: colors.error.primary,
          borderColor: colors.error.primary,
        },
        ':hover': {
          backgroundColor: colors.error.muted,
          borderColor: colors.error.muted,
        },
        ':active': {
          backgroundColor: colors.error.satured,
          borderColor: colors.error.satured,
        },
        'web': {
          ':focus-visible': {
            outlineColor: colors.error.primary,
          },
        },
      },
      text: { 'base': { color: colors.white } },
      textHover: {},
      textActive: {},
    }) satisfies RequiredKeys
);

export const textStyles = createStyles(() => ({
  default: { base: { fontWeight: 'bold' } },
  disabled: { base: { pointerEvents: 'none' } },
  // sm: { base: { height: 32, paddingHorizontal: space.xs } },
  // md: { base: { height: 44, paddingHorizontal: space.md } },
  // lg: { base: { height: 52, paddingHorizontal: space.lg } },
}));
