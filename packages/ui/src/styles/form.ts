/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const form = createStyles(({ space, font, colors, radius }) => ({
  inputError: {
    base: {
      // borderColor: colors.error.primary,
      // color: colors.error.primary,
    },
  },
  input: {
    'base': {
      color: colors.text.primary.default,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.primary.default,
      backgroundColor: colors.background.primary.alt,
      borderRadius: radius.md,
      paddingVertical: space.xs,
      paddingHorizontal: space.md,
      justifyContent: 'center',
      alignItems: 'center',
      height: 44,
      flexDirection: 'row',
      flex: 1,
    },
    ':hover': {
      // borderColor: Input.primary.hover.border,
    },
    ':focus': {
      borderColor: colors.border.brand.default,
    },
    ':active': {
      // borderColor: Input.primary.focus.border,
    },
    ':disabled': {
      // backgroundColor: Input.primary.disabled.background,
      // borderColor: Input.primary.disabled.border,
    },
    'web': {
      'base': { boxSizing: 'border-box' },
      ':focus-visible': { outlineWidth: 0 },
      ':focus': {
        // outlineColor: Input.primary.focus.border,
      },
      ':disabled': { cursor: 'not-allowed' },
    },
  },
  placeholder: {
    base: {
      color: colors.text.placeholder.default,
    },
  },
  label: {
    'base': { color: colors.text.secondary.default },
    ':focus': {
      color: colors.text.secondary.default,
    },
    ':disabled': {
      // color: colors.text.secondary,
    },
  },
  labelDescription: {
    base: {
      // color: colors.text.secondary,
    },
  },
  labelExtra: {
    base: {
      // color: colors.text.secondary,
      flex: 1,
    },
  },
  containerLabel: {},
  elementRight: {
    base: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      padding: space.md,
      paddingVertical: 0,
      alignItems: 'center',
    },
  },
  elementLeft: {
    base: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      paddingVertical: 0,
      justifyContent: 'center',
      padding: space.md,
      alignItems: 'center',
    },
  },
}));
