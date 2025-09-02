/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, inlineStyle } from '@crossed/styled';

export const buttonStyle = inlineStyle(({ radius }) => ({
  base: {
    display: 'flex',
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    gap: 8,
  },
}));

export const buttonOutlineStyle = createStyles(({ colors }) => ({
  default: {
    base: {
      position: 'absolute',
      borderWidth: 2,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      top: -4,
      right: -4,
      left: -4,
      bottom: -4,
    },
  },
  primary: { base: { borderColor: colors.background.brand.solid.default } },
  error: { base: { borderColor: colors.background.error.solid.default } },
}));

export const buttonSizeStyles = createStyles(() => ({
  sm: { base: { paddingVertical: 8, paddingHorizontal: 12 } },
  md: { base: { paddingVertical: 10, paddingHorizontal: 14 } },
  lg: { base: { paddingVertical: 10, paddingHorizontal: 16 } },
  xl: { base: { paddingVertical: 12, paddingHorizontal: 18 } },
}));

export const buttonPrimaryStyles = createStyles(({ colors }) => ({
  root: {
    'base': {
      backgroundColor: colors.background.brand.solid.default,
      borderColor: colors.background.brand.solid.default,
    },
    ':hover': {
      backgroundColor: colors.background.brand.solid.hover,
      borderColor: colors.background.brand.solid.hover,
    },
    ':active': {
      backgroundColor: colors.background.brand.solid.default,
      borderColor: colors.background.brand.solid.default,
    },
  },
  disabled: {
    base: {
      backgroundColor: colors.background.disabled.default,
      borderColor: colors.border.disabled.subtle,
    },
  },
  text: { 'base': { color: colors.primary.base.white } },
  textHover: { 'base': { color: colors.primary.base.white } },
  textActive: { 'base': { color: colors.primary.base.white } },
  textDisabled: { 'base': { color: colors.text.secondary.brand } },
}));

export const buttonSecondaryStyles = createStyles(({ colors }) => ({
  root: {
    'base': {
      borderColor: colors.background.brand.secondary.default,
      backgroundColor: colors.background.brand.secondary.default,
    },
    ':hover': {
      borderColor: colors.background.brand.secondary.hover,
      backgroundColor: colors.background.brand.secondary.hover,
    },
    ':active': {
      borderColor: colors.background.active.default,
      backgroundColor: colors.background.active.default,
    },
  },
  disabled: {
    base: {
      backgroundColor: colors.background.primary.alt,
      borderColor: colors.background.primary.alt,
    },
  },
  text: { 'base': { color: colors.text.brand.tertiary.default } },
  textHover: { 'base': { color: colors.text.brand.secondary.hover } },
  textActive: { 'base': { color: colors.text.brand.secondary.default } },
  textDisabled: { 'base': { color: colors.text.quaternary.brand } },
}));

export const buttonTertiaryStyles = createStyles(({ colors }) => ({
  root: {
    'base': {
      borderColor: colors.primary.base.transparent,
      backgroundColor: colors.primary.base.transparent,
    },
    ':hover': {
      borderColor: colors.background.brand.secondary.hover,
      backgroundColor: colors.background.brand.secondary.hover,
    },
    ':active': {
      borderColor: colors.background.primary.default,
      backgroundColor: colors.background.primary.default,
    },
  },
  text: { 'base': { color: colors.text.brand.tertiary.default } },
  textHover: { 'base': { color: colors.text.brand.secondary.hover } },
  textActive: { 'base': { color: colors.text.brand.secondary.default } },
  textDisabled: { 'base': { color: colors.text.quaternary.brand } },
}));

export const buttonPrimaryErrorStyle = createStyles(({ colors }) => ({
  root: {
    base: {
      borderColor: colors.background.error.solid.default,
      backgroundColor: colors.background.error.solid.default,
    },
    ':hover': {
      borderColor: colors.background.error.solid.default,
      backgroundColor: colors.background.error.solid.default,
    },
    ':active': {
      borderColor: colors.background.error.solid.default,
      backgroundColor: colors.background.error.solid.default,
    },
  },
  disabled: {
    base: {
      backgroundColor: colors.background.error.secondary.default,
      borderColor: colors.background.error.secondary.default,
    },
  },
  text: { 'base': { color: colors.primary.base.white } },
  textHover: { 'base': { color: colors.primary.base.white } },
  textActive: { 'base': { color: colors.primary.base.white } },
  textDisabled: { 'base': { color: colors.primary.base.white } },
}));

export const buttonSecondaryErrorStyle = createStyles(({ colors }) => ({
  root: {
    base: {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.primary.default,
    },
    ':hover': {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.secondary.default,
    },
    ':active': {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.primary.default,
    },
  },
  disabled: {
    base: {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.primary.default,
    },
  },
  text: { 'base': { color: colors.text.error.default } },
  textHover: { 'base': { color: colors.text.error.hover } },
  textActive: { 'base': { color: colors.text.error.hover } },
  textDisabled: { 'base': { color: colors.text.error.default } },
}));

export const buttonTertiaryErrorStyle = createStyles(({ colors }) => ({
  root: {
    base: {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.primary.default,
    },
    ':hover': {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.secondary.default,
    },
    ':active': {
      borderColor: colors.border.error.subtle,
      backgroundColor: colors.background.error.primary.default,
    },
  },
  text: { 'base': { color: colors.text.error.default } },
  textHover: { 'base': { color: colors.text.error.hover } },
  textActive: { 'base': { color: colors.text.error.hover } },
  textDisabled: { 'base': { color: colors.text.error.default } },
}));

export const textStyles = createStyles(() => ({
  default: { base: { fontWeight: 'bold' } },
  disabled: { base: { pointerEvents: 'none' } },
}));
