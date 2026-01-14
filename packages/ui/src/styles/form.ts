/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const form = createStyles(
  ({ space, font, colors, components: { Input } }) => ({
    inputError: {
      base: {
        borderColor: colors.error.primary,
        color: colors.error.primary,
      },
    },
    input: {
      'base': {
        color: Input.primary.default.text,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Input.primary.default.border,
        backgroundColor: Input.primary.default.background,
        borderRadius: 8,
        paddingVertical: space.md,
        paddingHorizontal: space.xl,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        flexDirection: 'row',
        flex: 1,
      },
      ':hover': { borderColor: Input.primary.hover.border },
      ':focus': { borderColor: Input.primary.focus.border },
      ':active': { borderColor: Input.primary.focus.border },
      ':disabled': {
        backgroundColor: Input.primary.disabled.background,
        borderColor: Input.primary.disabled.border,
      },
      'web': {
        'base': { boxSizing: 'border-box' },
        ':focus-visible': { outlineWidth: 0 },
        ':focus': { outlineColor: Input.primary.focus.border },
        ':disabled': { cursor: 'not-allowed' },
      },
    },
    disabled: {
      base: {
        backgroundColor: Input.primary.disabled.background,
        borderColor: Input.primary.disabled.border,
      },
    },
    placeholder: { base: { color: Input.primary.default.placeholder } },
    label: {
      'base': { color: font.color, fontWeight: font.fontWeight.lg },
      ':focus': { color: colors.text.brand },
      ':disabled': { color: colors.text.secondary },
    },
    labelDescription: { base: { color: colors.text.secondary } },
    labelExtra: { base: { color: colors.text.secondary, flex: 1 } },
    containerLabel: {},
    elementRight: {
      base: {
        zIndex: 5,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: space.xl,
        paddingRight: space.xl,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
      },
    },
    elementLeft: {
      base: {
        zIndex: 5,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: space.xl,
        paddingRight: space.xl,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
      },
    },
  })
);
