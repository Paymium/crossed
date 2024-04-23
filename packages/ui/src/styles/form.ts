/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, type ExtractForProps } from '@crossed/styled';

export const form = createStyles((t) => ({
  input: {
    'base': {
      color: t.font.color,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral[500],
      backgroundColor: t.colors.neutral[200],
      borderRadius: 8,
      paddingVertical: t.space.xxs,
      paddingHorizontal: t.space.xs,
      justifyContent: 'center',
      alignItems: 'center',
      height: 44,
      flexDirection: 'row',
      flex: 1,
    },
    ':hover': { borderColor: t.colors.brand.bright },
    ':focus': { borderColor: t.colors.brand.bright },
    ':active': { borderColor: t.colors.brand.bright },
    ':disabled': {
      borderColor: t.colors.neutral[200],
      color: t.colors.brand.bright,
    },
    'variants': {
      error: {
        true: {
          base: {
            borderColor: t.colors.error.bright,
            color: t.colors.error.bright,
          },
        },
      },
    },
    'web': {
      'base': { boxSizing: 'border-box' },
      ':focus-visible': { outlineWidth: 0 },
      ':focus': { outlineColor: t.colors.brand.bright },
    },
  },
  placeholder: { base: { color: t.colors.neutral.bright } },
  label: {
    'base': { color: t.font.color, fontWeight: t.font.fontWeight.lg },
    ':focus': { color: t.colors.brand.muted },
    ':disabled': { color: t.colors.neutral[500] },
  },
  labelDescription: { base: { color: t.colors.neutral.bright } },
  labelExtra: { base: { color: t.colors.neutral.bright, flex: 1 } },
  containerLabel: {},
  elementRight: {
    base: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      padding: t.space.xs,
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
      padding: t.space.xs,
      alignItems: 'center',
    },
  },
}));

export type FormInput = ExtractForProps<typeof form.input>;
export type FormLabel = ExtractForProps<typeof form.label>;
