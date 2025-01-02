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
  font: { ...font, color: 'white' },
  components: {
    Banner: {
      success: {
        title: colors.primary[1],
        subtitle: colors.primary[20],
        icon: colors.primary[80],
        backgroundIcon: colors.success.primary,
        background: colors.primary[70],
        border: colors.success.primary,
      },
      info: {
        title: colors.primary[1],
        subtitle: colors.primary[20],
        icon: colors.primary[80],
        backgroundIcon: colors.info.primary,
        background: colors.primary[70],
        border: colors.info.primary,
      },
      warning: {
        title: colors.primary[1],
        subtitle: colors.primary[20],
        icon: colors.primary[80],
        backgroundIcon: colors.warning.primary,
        background: colors.primary[70],
        border: colors.warning.primary,
      },
      error: {
        title: colors.primary[1],
        subtitle: colors.primary[20],
        icon: colors.primary[80],
        backgroundIcon: colors.error.primary,
        background: colors.primary[70],
        border: colors.error.primary,
      },
    },
    Action: {
      primary: {
        default: {
          text: colors.white,
          icon: colors.white,
          background: colors.primary.primary,
          border: colors.primary.primary,
        },
        hover: {
          text: colors.white,
          icon: colors.white,
          background: colors.primary[50],
          border: colors.primary[50],
        },
        active: {
          text: colors.white,
          icon: colors.white,
          background: colors.primary[60],
          border: colors.primary[60],
        },
        focus: {
          text: colors.white,
          icon: colors.white,
          background: colors.primary[60],
          border: colors.primary[60],
        },
        disabled: {
          text: colors.primary[80],
          icon: colors.primary[80],
          background: colors.primary[100],
          border: colors.primary[100],
        },
      },
      secondary: {
        default: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.neutral['60'],
          border: colors.neutral['60'],
        },
        hover: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.neutral['50'],
          border: colors.neutral['50'],
        },
        active: {
          text: colors.primary.primary,
          icon: colors.primary.primary,
          background: colors.neutral['60'],
          border: colors.neutral['50'],
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: colors.primary[10],
          icon: colors.primary[10],
          background: colors.primary[40],
          border: colors.primary[40],
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
          color: colors.white,
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          color: colors.white,
          background: colors.primary[70],
          border: colors.primary[70],
        },
        active: {
          color: colors.white,
          background: colors.primary[70],
          border: colors.primary[70],
        },
        focus: {
          background: colors.primary[70],
          color: colors.white,
          border: colors.primary[40],
        },
        disabled: {
          color: colors.white,
          background: colors.primary[70],
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
          text: colors.text.primary,
          icon: colors.text.primary,
          placeholder: colors.text.secondary,
        },
        active: {
          background: colors.background.secondary,
          border: colors.border.secondary,
          text: colors.text.primary,
          icon: colors.text.primary,
          placeholder: colors.text.secondary,
        },
        disabled: {
          background: colors.primary[90],
          border: colors.primary[90],
          text: colors.text.secondary,
          icon: colors.text.secondary,
          placeholder: colors.text.secondary,
        },
        focus: {
          background: colors.background.secondary,
          border: colors.border.brand,
          text: colors.text.primary,
          icon: colors.text.primary,
          placeholder: colors.text.secondary,
        },
        hover: {
          background: colors.background.secondary,
          border: colors.border.brand,
          text: colors.text.primary,
          icon: colors.text.primary,
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
        background: colors.primary[70],
        text: colors.text.primary,
      },
      green: { background: '#306C60', text: colors.text.primary },
      red: { background: '#A21A1A', text: colors.error.low },
    },
  },
} as const satisfies Theme;
