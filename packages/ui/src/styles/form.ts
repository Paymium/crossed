/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const form = createStyles(({ space, colors, radius }) => ({
  inputError: {
    'base': {
      borderColor: colors.border.error.subtle,
    },
    ':focus': {
      borderColor: colors.border.error.default,
    },
  },
  input: {
    'base': {
      color: colors.text.primary.default,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border.primary.w,
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
    ':disabled': {
      backgroundColor: colors.background.disabled.subtle,
      borderColor: colors.border.disabled.subtlew,
    },
    'web': {
      'base': { boxSizing: 'border-box' },
      ':focus-visible': { outlineWidth: 0 },
      ':disabled': { cursor: 'not-allowed' },
    },
  },
  placeholder: {
    base: {
      color: colors.text.placeholder.default,
    },
  },
  label: {
    'base': { color: colors.text.secondary.default, fontWeight: 500 },
    ':focus': {
      color: colors.text.secondary.default,
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
