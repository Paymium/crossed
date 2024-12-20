/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import colors from './colors';
import { font } from '../font';
import type { Theme } from '../types/theme';

export default {
  boxShadow: '0 0 10px #0e0e22',
  colors: colors,
  space,
  font: {
    ...font,
    color: 'white',
  },
  components: {
    Banner: {
      success: {
        title: colors.success.dark,
        background: colors.background.secondary,
        border: colors.success.primary,
        icon: colors.white,
        backgroundIcon: colors.success.primary,
        subtitle: colors.neutral[70],
      },
      info: {
        title: colors.info.dark,
        background: colors.background.secondary,
        border: colors.info.primary,
        icon: colors.white,
        backgroundIcon: colors.info.primary,
        subtitle: colors.neutral[70],
      },
      warning: {
        title: colors.warning.dark,
        background: colors.background.secondary,
        border: colors.warning.primary,
        icon: colors.white,
        backgroundIcon: colors.warning.primary,
        subtitle: colors.neutral[70],
      },
      error: {
        title: colors.error.satured,
        background: colors.background.secondary,
        border: colors.error.primary,
        icon: colors.white,
        backgroundIcon: colors.error.primary,
        subtitle: colors.neutral[70],
      },
    },
    Action: {
      primary: {
        default: {
          background: colors.primary.primary,
          border: colors.primary.primary,
          text: colors.white,
          icon: '',
        },
        hover: {
          background: colors.primary[50],
          border: colors.primary[50],
          text: colors.white,
          icon: '',
        },
        active: {
          background: colors.primary[60],
          border: colors.primary[60],
          text: colors.white,
          icon: '',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          background: colors.primary[90],
          text: '',
          icon: '',
          border: '',
        },
      },
      secondary: {
        default: {
          text: colors.primary[40],
          icon: colors.primary[40],
          background: colors.primary[90],
          border: colors.primary[40],
        },
        hover: {
          text: colors.primary[40],
          icon: colors.primary[40],
          background: colors.primary[80],
          border: colors.primary[40],
        },
        active: {
          text: colors.primary[40],
          icon: colors.primary[40],
          background: colors.primary[70],
          border: colors.primary[40],
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: colors.primary[80],
          icon: colors.primary[80],
          background: colors.primary[100],
          border: colors.primary[100],
        },
      },
      tertiary: {
        default: {
          text: colors.primary[40],
          icon: colors.primary[40],
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          text: colors.primary[30],
          icon: colors.primary[30],
          background: 'transparent',
          border: 'transparent',
        },
        active: {
          text: colors.primary[20],
          icon: colors.primary[20],
          background: 'transparent',
          border: 'transparent',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: colors.primary[80],
          icon: colors.primary[80],
          background: 'transparent',
          border: 'transparent',
        },
      },
      icon: {
        default: {
          color: colors.primary.primary,
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          color: colors.primary[50],
          background: 'transparent',
          border: 'transparent',
        },
        active: {
          color: colors.primary[60],
          background: 'transparent',
          border: 'transparent',
        },
        focus: { background: '', color: '', border: '' },
        disabled: {
          color: colors.primary[10],
          background: 'transparent',
          border: 'transparent',
        },
      },
    },
    Alert: {
      error: {
        background: colors.primary[70],
        border: colors.primary[70],
        icon: colors.error.primary,
        text: colors.error.primary,
      },
      warning: {
        background: colors.primary[70],
        border: colors.primary[70],
        icon: colors.warning.primary,
        text: colors.warning.primary,
      },
      info: {
        background: colors.primary[70],
        border: colors.primary[70],
        icon: colors.info.primary,
        text: colors.info.primary,
      },
      success: {
        background: colors.primary[70],
        border: colors.primary[70],
        icon: colors.success.primary,
        text: colors.success.primary,
      },
    },
    Input: {
      primary: {
        default: {
          background: colors.background.secondary,
          border: colors.border.secondary,
          text: colors.black,
          icon: colors.black,
          placeholder: colors.text.secondary,
        },
        active: {
          background: colors.background.secondary,
          border: colors.border.secondary,
          text: colors.black,
          icon: colors.black,
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
          text: colors.black,
          icon: colors.black,
          placeholder: colors.text.secondary,
        },
        hover: {
          background: colors.background.secondary,
          border: colors.border.brand,
          text: colors.black,
          icon: colors.black,
          placeholder: colors.text.secondary,
        },
      },
    },
    Card: {
      default: {
        background: colors.primary[90],
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
      active: {
        background: colors.primary[70],
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
      hover: {
        background: colors.primary[80],
        border: colors.border.primary,
        description: colors.text.secondary,
        title: colors.text.primary,
      },
    },
    Tag: {
      default: {
        background: colors.background.primary,
        text: colors.text.primary,
      },
      green: { background: '#306C60', text: colors.success.light },
      red: { background: '#A21A1A', text: colors.error.low },
    },
  },
} as const satisfies Theme;
