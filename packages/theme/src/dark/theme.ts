/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { space } from '../space';
import paymiumDark from './colors';
import { font as paymiumFont } from '../font';
import type { Theme } from '../types/theme';

export default {
  boxShadow: '0 0 10px #0e0e22',
  colors: paymiumDark,
  space,
  font: { ...paymiumFont, color: 'white' },
  components: {
    Banner: {
      success: {
        title: paymiumDark.primary[1],
        subtitle: paymiumDark.primary[20],
        icon: paymiumDark.primary[80],
        backgroundIcon: paymiumDark.success.primary,
        background: paymiumDark.primary[70],
        border: paymiumDark.success.primary,
      },
      info: {
        title: paymiumDark.primary[1],
        subtitle: paymiumDark.primary[20],
        icon: paymiumDark.primary[80],
        backgroundIcon: paymiumDark.info.primary,
        background: paymiumDark.primary[70],
        border: paymiumDark.info.primary,
      },
      warning: {
        title: paymiumDark.primary[1],
        subtitle: paymiumDark.primary[20],
        icon: paymiumDark.primary[80],
        backgroundIcon: paymiumDark.warning.primary,
        background: paymiumDark.primary[70],
        border: paymiumDark.warning.primary,
      },
      error: {
        title: paymiumDark.primary[1],
        subtitle: paymiumDark.primary[20],
        icon: paymiumDark.primary[80],
        backgroundIcon: paymiumDark.error.primary,
        background: paymiumDark.primary[70],
        border: paymiumDark.error.primary,
      },
    },
    Action: {
      primary: {
        default: {
          text: paymiumDark.white,
          icon: paymiumDark.white,
          background: paymiumDark.primary.primary,
          border: paymiumDark.primary.primary,
        },
        hover: {
          text: paymiumDark.white,
          icon: paymiumDark.white,
          background: paymiumDark.primary[50],
          border: paymiumDark.primary[50],
        },
        active: {
          text: paymiumDark.white,
          icon: paymiumDark.white,
          background: paymiumDark.primary[60],
          border: paymiumDark.primary[60],
        },
        focus: {
          text: paymiumDark.white,
          icon: paymiumDark.white,
          background: paymiumDark.primary[60],
          border: paymiumDark.primary[60],
        },
        disabled: {
          text: paymiumDark.primary[80],
          icon: paymiumDark.primary[80],
          background: paymiumDark.primary[100],
          border: paymiumDark.primary[100],
        },
      },
      secondary: {
        default: {
          text: paymiumDark.primary[40],
          icon: paymiumDark.primary[40],
          background: paymiumDark.primary[90],
          border: paymiumDark.primary[40],
        },
        hover: {
          text: paymiumDark.primary[40],
          icon: paymiumDark.primary[40],
          background: paymiumDark.primary[80],
          border: paymiumDark.primary[40],
        },
        active: {
          text: paymiumDark.primary[40],
          icon: paymiumDark.primary[40],
          background: paymiumDark.primary[70],
          border: paymiumDark.primary[40],
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: paymiumDark.primary[80],
          icon: paymiumDark.primary[80],
          background: paymiumDark.primary[100],
          border: paymiumDark.primary[100],
        },
      },
      tertiary: {
        default: {
          text: paymiumDark.primary[40],
          icon: paymiumDark.primary[40],
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          text: paymiumDark.primary[30],
          icon: paymiumDark.primary[30],
          background: 'transparent',
          border: 'transparent',
        },
        active: {
          text: paymiumDark.primary[20],
          icon: paymiumDark.primary[20],
          background: 'transparent',
          border: 'transparent',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: {
          text: paymiumDark.primary[80],
          icon: paymiumDark.primary[80],
          background: 'transparent',
          border: 'transparent',
        },
      },
      icon: {
        default: {
          color: paymiumDark.white,
          background: 'transparent',
          border: 'transparent',
        },
        hover: {
          color: paymiumDark.white,
          background: paymiumDark.primary[70],
          border: paymiumDark.primary[70],
        },
        active: {
          color: paymiumDark.white,
          background: paymiumDark.primary[70],
          border: paymiumDark.primary[70],
        },
        focus: {
          background: paymiumDark.primary[70],
          color: paymiumDark.white,
          border: paymiumDark.primary[40],
        },
        disabled: {
          color: paymiumDark.white,
          background: paymiumDark.primary[70],
          border: 'transparent',
        },
      },
    },
    Alert: {
      error: {
        background: paymiumDark.primary[70],
        border: paymiumDark.primary[70],
        icon: paymiumDark.error.primary,
        text: paymiumDark.error.primary,
      },
      warning: {
        background: paymiumDark.primary[70],
        border: paymiumDark.primary[70],
        icon: paymiumDark.warning.primary,
        text: paymiumDark.warning.primary,
      },
      info: {
        background: paymiumDark.primary[70],
        border: paymiumDark.primary[70],
        icon: paymiumDark.info.primary,
        text: paymiumDark.info.primary,
      },
      success: {
        background: paymiumDark.primary[70],
        border: paymiumDark.primary[70],
        icon: paymiumDark.success.primary,
        text: paymiumDark.success.primary,
      },
    },
    Input: {
      primary: {
        default: {
          background: paymiumDark.background.secondary,
          border: paymiumDark.border.secondary,
          text: paymiumDark.text.primary,
          icon: paymiumDark.text.primary,
          placeholder: paymiumDark.text.secondary,
        },
        active: {
          background: paymiumDark.background.secondary,
          border: paymiumDark.border.secondary,
          text: paymiumDark.text.primary,
          icon: paymiumDark.text.primary,
          placeholder: paymiumDark.text.secondary,
        },
        disabled: {
          background: paymiumDark.primary[90],
          border: paymiumDark.primary[90],
          text: paymiumDark.text.secondary,
          icon: paymiumDark.text.secondary,
          placeholder: paymiumDark.text.secondary,
        },
        focus: {
          background: paymiumDark.background.secondary,
          border: paymiumDark.border.brand,
          text: paymiumDark.text.primary,
          icon: paymiumDark.text.primary,
          placeholder: paymiumDark.text.secondary,
        },
        hover: {
          background: paymiumDark.background.secondary,
          border: paymiumDark.border.brand,
          text: paymiumDark.text.primary,
          icon: paymiumDark.text.primary,
          placeholder: paymiumDark.text.secondary,
        },
      },
    },
    Card: {
      default: {
        background: paymiumDark.primary[90],
        border: paymiumDark.border.primary,
        description: paymiumDark.text.secondary,
        title: paymiumDark.text.primary,
      },
      active: {
        background: paymiumDark.primary[70],
        border: paymiumDark.border.primary,
        description: paymiumDark.text.secondary,
        title: paymiumDark.text.primary,
      },
      hover: {
        background: paymiumDark.primary[80],
        border: paymiumDark.border.primary,
        description: paymiumDark.text.secondary,
        title: paymiumDark.text.primary,
      },
    },
    Tag: {
      default: {
        background: paymiumDark.primary[70],
        text: paymiumDark.text.primary,
      },
      green: { background: '#306C60', text: paymiumDark.text.primary },
      red: { background: '#A21A1A', text: paymiumDark.error.low },
    },
  },
} as const satisfies Theme;
