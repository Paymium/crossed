/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import type { Theme } from '../types/theme';
import paymiumLight from './colors';
import { font as paymiumFont } from '../font';

export default {
  colors: paymiumLight,
  boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
  space,
  font: paymiumFont,
  components: {
    Banner: {
      success: {
        title: paymiumLight.success.dark,
        background: paymiumLight.white,
        border: paymiumLight.success.primary,
        icon: paymiumLight.success.dark,
        backgroundIcon: paymiumLight.success.light,
        subtitle: paymiumLight.neutral[80],
      },
      info: {
        title: paymiumLight.info.dark,
        background: paymiumLight.white,
        border: paymiumLight.info.primary,
        icon: paymiumLight.info.dark,
        backgroundIcon: paymiumLight.info.light,
        subtitle: paymiumLight.neutral[80],
      },
      warning: {
        title: paymiumLight.warning.dark,
        background: paymiumLight.white,
        border: paymiumLight.warning.primary,
        icon: paymiumLight.warning.dark,
        backgroundIcon: paymiumLight.warning.light,
        subtitle: paymiumLight.neutral[80],
      },
      error: {
        title: paymiumLight.error.satured,
        background: paymiumLight.white,
        border: paymiumLight.error.primary,
        icon: paymiumLight.error.satured,
        backgroundIcon: paymiumLight.error.low,
        subtitle: paymiumLight.neutral[80],
      },
    },
    Action: {
      primary: {
        default: {
          text: paymiumLight.white,
          icon: paymiumLight.white,
          background: paymiumLight.primary.primary,
          border: paymiumLight.primary.primary,
        },
        hover: {
          text: paymiumLight.white,
          icon: paymiumLight.white,
          background: paymiumLight.primary[50],
          border: paymiumLight.primary[50],
        },
        active: {
          text: paymiumLight.white,
          icon: paymiumLight.white,
          background: paymiumLight.primary[60],
          border: paymiumLight.primary[60],
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: paymiumLight.primary[10],
          icon: paymiumLight.primary[10],
          background: paymiumLight.primary[40],
          border: paymiumLight.primary[40],
        },
      },
      secondary: {
        default: {
          text: paymiumLight.primary.primary,
          icon: paymiumLight.primary.primary,
          background: paymiumLight.white,
          border: paymiumLight.primary.primary,
        },
        hover: {
          text: paymiumLight.primary.primary,
          icon: paymiumLight.primary.primary,
          background: paymiumLight.primary[1],
          border: paymiumLight.primary.primary,
        },
        active: {
          text: paymiumLight.primary.primary,
          icon: paymiumLight.primary.primary,
          background: paymiumLight.primary[10],
          border: paymiumLight.primary.primary,
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: paymiumLight.primary[10],
          icon: paymiumLight.primary[10],
          background: paymiumLight.primary[40],
          border: paymiumLight.primary[40],
        },
      },
      tertiary: {
        default: {
          text: paymiumLight.primary.primary,
          icon: paymiumLight.primary.primary,
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          text: paymiumLight.primary[50],
          icon: paymiumLight.primary[50],
          background: 'transparent',
          border: 'transparent',
        },
        active: {
          text: paymiumLight.primary[60],
          icon: paymiumLight.primary[60],
          background: 'transparent',
          border: 'transparent',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: paymiumLight.primary[10],
          icon: paymiumLight.primary[10],
          background: 'transparent',
          border: 'transparent',
        },
      },
      icon: {
        default: {
          color: paymiumLight.neutral[80],
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          color: paymiumLight.neutral[80],
          background: paymiumLight.primary[1],
          border: paymiumLight.primary[1],
        },
        active: {
          color: paymiumLight.neutral[80],
          background: paymiumLight.primary[10],
          border: paymiumLight.primary[10],
        },
        focus: {
          background: paymiumLight.primary[1],
          color: paymiumLight.neutral[80],
          border: paymiumLight.primary[40],
        },
        disabled: {
          color: paymiumLight.neutral[80],
          background: 'transparent',
          border: 'transparent',
        },
      },
    },
    Alert: {
      error: {
        background: paymiumLight.error.low,
        border: paymiumLight.error.primary,
        icon: paymiumLight.error.satured,
        text: paymiumLight.error.satured,
      },
      warning: {
        background: paymiumLight.warning.light,
        border: paymiumLight.warning.primary,
        icon: paymiumLight.warning.dark,
        text: paymiumLight.warning.dark,
      },
      info: {
        background: paymiumLight.info.light,
        border: paymiumLight.info.primary,
        icon: paymiumLight.info.dark,
        text: paymiumLight.info.dark,
      },
      success: {
        background: paymiumLight.success.light,
        border: paymiumLight.success.primary,
        icon: paymiumLight.success.dark,
        text: paymiumLight.success.dark,
      },
    },
    Input: {
      primary: {
        default: {
          background: paymiumLight.background.secondary,
          border: paymiumLight.border.secondary,
          text: paymiumLight.text.primary,
          icon: paymiumLight.text.primary,
          placeholder: paymiumLight.text.secondary,
        },
        active: {
          background: paymiumLight.background.secondary,
          border: paymiumLight.border.secondary,
          text: paymiumLight.text.primary,
          icon: paymiumLight.text.primary,
          placeholder: paymiumLight.text.secondary,
        },
        disabled: {
          background: paymiumLight.primary[10],
          border: paymiumLight.primary[10],
          text: paymiumLight.text.secondary,
          icon: paymiumLight.text.secondary,
          placeholder: paymiumLight.text.secondary,
        },
        focus: {
          background: paymiumLight.background.secondary,
          border: paymiumLight.border.brand,
          text: paymiumLight.text.primary,
          icon: paymiumLight.text.primary,
          placeholder: paymiumLight.text.secondary,
        },
        hover: {
          background: paymiumLight.background.secondary,
          border: paymiumLight.border.brand,
          text: paymiumLight.text.primary,
          icon: paymiumLight.text.primary,
          placeholder: paymiumLight.text.secondary,
        },
      },
    },
    Card: {
      default: {
        background: paymiumLight.primary[90],
        border: paymiumLight.border.primary,
        description: paymiumLight.text.secondary,
        title: paymiumLight.text.primary,
      },
      active: {
        background: paymiumLight.primary[10],
        border: paymiumLight.border.primary,
        description: paymiumLight.text.secondary,
        title: paymiumLight.text.primary,
      },
      hover: {
        background: paymiumLight.primary[1],
        border: paymiumLight.border.primary,
        description: paymiumLight.text.secondary,
        title: paymiumLight.text.primary,
      },
    },
    Tag: {
      default: {
        background: paymiumLight.background.primary,
        text: paymiumLight.text.primary,
      },
      green: {
        background: paymiumLight.success.light,
        text: paymiumLight.success.dark,
      },
      red: {
        background: paymiumLight.error.low,
        text: paymiumLight.error.muted,
      },
    },
  },
} as const satisfies Theme;
