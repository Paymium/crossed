/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import type { Theme } from '../types/theme';
import colors from './colors';
import { font } from '../font';

export default {
  colors: colors,
  space,
  font,
  components: {
    Banner: {
      success: {
        title: colors.success.dark,
        background: colors.white,
        border: colors.success.primary,
        icon: colors.success.dark,
        backgroundIcon: colors.success.light,
        subtitle: colors.neutral[80],
      },
      info: {
        title: colors.info.dark,
        background: colors.white,
        border: colors.info.primary,
        icon: colors.info.dark,
        backgroundIcon: colors.info.light,
        subtitle: colors.neutral[80],
      },
      warning: {
        title: colors.warning.dark,
        background: colors.white,
        border: colors.warning.primary,
        icon: colors.warning.dark,
        backgroundIcon: colors.warning.light,
        subtitle: colors.neutral[80],
      },
      error: {
        title: colors.error.satured,
        background: colors.white,
        border: colors.error.primary,
        icon: colors.error.satured,
        backgroundIcon: colors.error.low,
        subtitle: colors.neutral[80],
      },
    },
    Action: {
      primary: {
        default: {
          background: colors.primary.primary,
          border: colors.primary.primary,
          text: colors.white,
          icon: colors.white,
        },
        hover: {
          background: colors.primary[50],
          border: colors.primary[50],
          text: colors.white,
          icon: colors.white,
        },
        active: {
          background: colors.primary[60],
          border: colors.primary[60],
          text: colors.white,
          icon: colors.white,
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
      secondary: {
        default: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.white,
          border: colors.primary.primary,
        },
        hover: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.primary[1],
          border: colors.primary.primary,
        },
        active: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.primary[10],
          border: colors.primary.primary,
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
      tertiary: {
        default: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          text: colors.primary[50],
          icon: colors.primary[50],
          background: 'transparent',
          border: 'transparent',
        },
        active: {
          text: colors.primary[60],
          icon: colors.primary[60],
          background: 'transparent',
          border: 'transparent',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: colors.primary[10],
          icon: colors.primary[10],
          background: 'transparent',
          border: 'transparent',
        },
      },
    },
  },
} as const satisfies Theme;
