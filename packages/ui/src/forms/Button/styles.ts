/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const buttonErrorStyles = createStyles(
  (t) =>
    ({
      error: {
        // web: {
        //   ':focus': {
        //     outlineWidth: '2px',
        //     outlineOffset: '2px',
        //     outlineStyle: 'solid',
        //     outlineColor: t.colors.error.primary,
        //   },
        // },
      },
      primary: {
        'base': {
          backgroundColor: t.colors.error.primary,
          borderColor: t.colors.error.primary,
        },
        ':hover': {
          backgroundColor: t.colors.error.muted,
          borderColor: t.colors.error.muted,
        },
        ':active': {
          backgroundColor: t.colors.error.satured,
          borderColor: t.colors.error.satured,
        },
        ':disabled': {
          backgroundColor: t.colors.error.hight,
          borderColor: t.colors.error.hight,
        },
      },
      secondary: {
        'base': {
          borderColor: t.colors.error.primary,
          backgroundColor: t.colors.error.low,
        },
        ':hover': {
          borderColor: t.colors.error.muted,
          backgroundColor: t.colors.error.low,
        },
        ':active': {
          borderColor: t.colors.error.satured,
          backgroundColor: t.colors.error.hight,
        },
        ':disabled': { borderColor: t.colors.error.hight },
      },
      tertiary: { base: {} },
    }) as const
);

export const buttonSizeStyles = createStyles(() => ({
  false: { base: { height: 'auto' } },
  true: { base: { height: 44 } },
}));
export const buttonStyles = createStyles(
  (t) =>
    ({
      root: {
        base: {
          display: 'flex',
          paddingHorizontal: t.space.xs,
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
        web: {
          'base': {
            boxSizing: 'border-box',
          },
          ':focus': {
            outlineWidth: '2px',
            outlineOffset: '2px',
            outlineStyle: 'solid',
            outlineColor: t.components.Action.primary.default.background,
          },
        },
      },
      primary: {
        'base': {
          backgroundColor: t.components.Action.primary.default.background,
          borderColor: t.components.Action.primary.default.background,
        },
        ':hover': {
          backgroundColor: t.components.Action.primary.hover.background,
          borderColor: t.components.Action.primary.hover.background,
        },
        ':active': {
          backgroundColor: t.components.Action.primary.active.background,
          borderColor: t.components.Action.primary.active.background,
        },
        ':disabled': {
          backgroundColor: t.components.Action.primary.disabled.background,
          borderColor: t.components.Action.primary.disabled.background,
        },
      },
      secondary: {
        'base': {
          borderColor: t.components.Action.secondary.default.border,
          backgroundColor: t.components.Action.secondary.default.background,
        },
        ':hover': {
          borderColor: t.components.Action.secondary.hover.border,
          backgroundColor: t.components.Action.secondary.hover.background,
        },
        ':active': {
          borderColor: t.components.Action.secondary.active.border,
          backgroundColor: t.components.Action.secondary.active.background,
        },
        ':disabled': {
          borderColor: t.components.Action.secondary.disabled.border,
          backgroundColor: t.components.Action.secondary.disabled.background,
        },
      },
      tertiary: {
        'base': {
          borderColor: t.components.Action.tertiary.default.border,
          backgroundColor: t.components.Action.tertiary.default.background,
        },
        ':hover': {
          borderColor: t.components.Action.tertiary.hover.border,
          backgroundColor: t.components.Action.tertiary.hover.background,
        },
        ':active': {
          borderColor: t.components.Action.tertiary.active.border,
          backgroundColor: t.components.Action.tertiary.active.background,
        },
        ':disabled': {
          borderColor: t.components.Action.tertiary.disabled.border,
          backgroundColor: t.components.Action.tertiary.disabled.background,
        },
      },
    }) as const
);
