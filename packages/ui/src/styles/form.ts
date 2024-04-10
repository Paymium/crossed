/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const form = createStyles((t) => ({
  input: {
    'base': {
      color: t.colors.default,
      // backgroundColor: t.colors.background,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: t.colors.neutral,
      // borderColor: t.utils.shadeColor(
      //   t.colors.neutral,
      //   UnistylesRuntime.themeName === 'dark' ? 100 : -100
      // ),
      borderRadius: 7,
      paddingVertical: t.space.sm,
      paddingHorizontal: t.space.md,
      height: 52,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    ':hover': { borderColor: t.colors.primary },
    ':focus': { outlineColor: t.colors.primary },
    ':focus-visible': { outlineColor: t.colors.primary, borderRadius: 7 },
  },
}));
