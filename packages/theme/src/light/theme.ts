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
        disabled: {
          background: colors.primary[1],
          text: '',
          icon: '',
          border: '',
        },
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
    Alert: {
      error: {
        background: colors.error.low,
        border: colors.error.primary,
        icon: colors.error.satured,
        text: colors.error.satured,
      },
      warning: {
        background: colors.warning.light,
        border: colors.warning.primary,
        icon: colors.warning.dark,
        text: colors.warning.dark,
      },
      info: {
        background: colors.info.light,
        border: colors.info.primary,
        icon: colors.info.dark,
        text: colors.info.dark,
      },
      success: {
        background: colors.success.light,
        border: colors.success.primary,
        icon: colors.success.dark,
        text: colors.success.dark,
      },
    },
    Input: {
      primary: {
        default: {
          background: colors.background.secondary,
          border: colors.border.secondary,
          text: colors.white,
          icon: colors.white,
          placeholder: colors.text.secondary,
        },
        active: {
          background: colors.background.secondary,
          border: colors.border.secondary,
          text: colors.white,
          icon: colors.white,
          placeholder: colors.text.secondary,
        },
        disabled: {
          background: colors.primary[10],
          border: colors.primary[10],
          text: colors.text.secondary,
          icon: colors.text.secondary,
          placeholder: colors.text.secondary,
        },
        focus: {
          background: colors.background.secondary,
          border: colors.border.brand,
          text: colors.white,
          icon: colors.white,
          placeholder: colors.text.secondary,
        },
        hover: {
          background: colors.background.secondary,
          border: colors.border.brand,
          text: colors.white,
          icon: colors.white,
          placeholder: colors.text.secondary,
        },
      },
    },
    Card: {
      default: {
        background: colors.background.primary,
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
      active: {
        background: colors.background.active,
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
      hover: {
        background: colors.background.hover,
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
    },
  },
} as const satisfies Theme;
