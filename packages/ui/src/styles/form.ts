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
      color: t.colors.default,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#AEB6CE',
      backgroundColor: '#EDEDF6',
      borderRadius: 8,
      paddingVertical: t.space.sm,
      paddingHorizontal: t.space.md,
      height: 44,
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      flex: 1,
    },
    ':hover': { borderColor: t.colors.primary.default },
    // ':active': { borderColor: t.colors.primary.default },
    ':focus': { borderColor: t.colors.primary.default },
    ':disabled': { borderColor: '#EDEDF6', color: '#6F7995' },
    'variants': {
      error: { true: { base: { borderColor: '#ef4444', color: '#ef4444' } } },
    },
  },
  placeholder: {
    base: { color: '#6F7995' },
  },
  label: {
    'base': {
      color: t.colors.default,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
    },
    ':focus': { color: t.colors.primary.hover },
    ':disabled': { color: '#AEB6CE' },
  },
}));

export type FormInput = ExtractForProps<typeof form.input>;
export type FormLabel = ExtractForProps<typeof form.label>;
