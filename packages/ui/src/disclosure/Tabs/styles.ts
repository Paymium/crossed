/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { SharedValue } from 'react-native-reanimated';

export const linearGradientRounded = createStyles(() => ({
  prev: {
    base: {
      left: 0,
      // background: `linear-gradient(to right, ${colors.background.primary} 70%, transparent)`,
    },
  },
  next: {
    base: {
      right: 0,
      // background: `linear-gradient(to left, ${colors.background.primary} 70%, transparent)`,
    },
  },
}));
export const linearGradientUnderline = createStyles(() => ({
  prev: {
    base: {
      left: 0,
      // background: `linear-gradient(to right, ${colors.background.secondary} 70%, transparent)`,
    },
  },
  next: {
    base: {
      right: 0,
      // background: `linear-gradient(to left, ${colors.background.secondary} 70%, transparent)`,
    },
  },
}));

export const indicatorRoundedStyles = createStyles(({ colors }) => ({
  active: {
    base: {
      backgroundColor: colors.background.secondary.default,
    },
  },
  default: {
    base: {
      backgroundColor: 'transparent',
      borderRadius: 24,
      position: 'absolute',
    },
    web: {
      base: { boxShadow: '0px 1px 4px 0px #1018280A' },
    },
  },
}));
export const indicatorMinimalStyles = createStyles(({ colors }) => ({
  active: {
    base: {
      backgroundColor: colors.background.primary.alt,
      borderColor: colors.border.primary.default,
      borderWidth: 1,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
  },
  default: {
    base: {
      backgroundColor: 'transparent',
      borderRadius: 24,
      position: 'absolute',
    },
    web: {
      base: { boxShadow: '0px 1px 4px 0px #1018280A' },
    },
  },
}));
export const indicatorBorderStyles = createStyles(({ colors, radius }) => ({
  active: {
    base: {
      backgroundColor: colors.background.primary.alt,
      borderColor: colors.background.primary.alt,
      borderWidth: 1,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
  },
  default: {
    base: {
      backgroundColor: 'transparent',
      borderRadius: radius.full,
      position: 'absolute',
    },
    web: {
      base: { boxShadow: '0px 1px 4px 0px #1018280A' },
    },
  },
}));
export const indicatorUnderlineStyles = createStyles(({ colors }) => ({
  active: {
    base: {
      backgroundColor: colors.primary.base.transparent,
      borderColor: colors.foreground.brand.primary.default,
      borderBottomWidth: 2,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
  },
  default: {
    base: {
      backgroundColor: 'transparent',
      position: 'absolute',
    },
  },
}));
export const indicatorBrandStyles = createStyles(({ colors, radius }) => ({
  active: {
    base: {
      backgroundColor: colors.background.brand.secondary.default,
      borderColor: colors.background.brand.secondary.default,
      borderWidth: 2,
      borderRadius: radius.full,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
  },
  default: {
    base: {
      backgroundColor: 'transparent',
      position: 'absolute',
    },
  },
}));
export const indicatorBrandGrayStyles = createStyles(() => ({
  active: { base: {} },
  default: { base: { backgroundColor: 'transparent', position: 'absolute' } },
}));

export const indicatorDynamicStyles = createStyles(() => ({
  dyn: (left: SharedValue<number>, width: SharedValue<number>) =>
    ({ width, transform: [{ translateX: left }] }) as any,
}));

export const tabTitleMinimalStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.tertiary.default } },
  hover: { base: { color: colors.text.secondary.default } },
  active: { base: { color: colors.text.quaternary.default } },
  selected: { base: { color: colors.text.brand.primary.default } },
}));
export const tabTitleBorderStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.tertiary.default } },
  hover: { base: { color: colors.text.secondary.default } },
  active: { base: { color: colors.text.quaternary.default } },
  selected: { base: { color: colors.text.brand.primary.default } },
}));
export const tabTitleUnderlineStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.quaternary.default } },
  hover: { base: { color: colors.text.secondary.default } },
  active: { base: { color: colors.text.quaternary.default } },
  selected: { base: { color: colors.text.brand.secondary.default } },
}));
export const tabTitleBrandStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.brand.secondary.default } },
  hover: { base: { color: colors.text.brand.secondary.default } },
  active: { base: { color: colors.text.brand.tertiary.default } },
  selected: { base: { color: colors.text.brand.secondary.default } },
}));
export const tabTitleBrandGrayStyles = createStyles(({ colors }) => ({
  default: { base: { color: colors.text.quaternary.default } },
  hover: { base: { color: colors.text.secondary.default } },
  active: { base: { color: colors.text.quaternary.default } },
  selected: { base: { color: colors.text.brand.secondary.default } },
}));
export const tabTitleStyles = createStyles(() => ({
  default: {
    base: {
      // color: colors.text.secondary,
    },
  },
  hover: {
    base: {
      // color: colors.text.primary,
    },
  },
  active: {
    base: {
      // color: colors.text.brand,
    },
  },
}));

export const triggerStyles = createStyles(({ space }) => ({
  disabled: {
    base: { opacity: 0.5, pointerEvents: 'none' },
    web: { base: { cursor: 'not-allowed' } },
  },
  trigger: {
    'base': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  sm: { base: { paddingHorizontal: space.lg } },
  md: { base: { paddingHorizontal: space.lg } },
}));

export const triggerVariantStyles = createStyles(({ radius, colors }) => ({
  brand: {
    'base': {
      borderRadius: radius.full,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: colors.primary.base.transparent,
    },
    ':active': {
      backgroundColor: colors.background.primary.default,
      borderColor: colors.background.brand.solid.default,
    },
    ':hover': {
      backgroundColor: colors.background.brand.secondary.hover,
      borderColor: colors.primary.base.transparent,
    },
  },
  brandGray: {
    'base': {
      borderRadius: radius.full,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: colors.primary.base.transparent,
    },
    ':hover': {
      backgroundColor: colors.background.secondary.hover,
      borderColor: colors.background.secondary.hover,
    },
    ':active': {
      backgroundColor: colors.background.secondary.default,
      borderColor: colors.background.brand.solid.default,
    },
  },
  underline: { base: {} },
  border: {
    'base': {
      borderRadius: radius.full,
      borderColor: colors.primary.base.transparent,
      borderWidth: 2,
      borderStyle: 'solid',
    },
    ':active': {
      backgroundColor: colors.background.primary.default,
      borderColor: colors.background.brand.solid.default,
    },
    ':disabled': {
      borderColor: colors.primary.base.transparent,
    },
  },
  minimal: {
    'base': {
      borderRadius: radius.full,
      borderColor: colors.primary.base.transparent,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    ':active': {
      backgroundColor: colors.background.primary.default,
      borderColor: colors.background.brand.solid.default,
    },
    ':disabled': {
      borderColor: colors.primary.base.transparent,
    },
  },
}));

export const heightStyles = createStyles(() => ({
  sm: { base: { height: 36 } },
  md: { base: { height: 44 } },
}));

export const focusStyles = createStyles(() => ({
  rounded: {
    web: {
      ':focus-visible': {
        // outlineColor: colors.border.brand,
        outlineOffset: '4px',
      },
    },
  },
  underline: {
    web: {
      ':focus-visible': {
        // outlineColor: colors.border.brand,
        outlineOffset: '4px',
      },
    },
  },
}));
