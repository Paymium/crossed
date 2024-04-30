/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { colorsDark, colorsLight } from './colors';
import { font } from './font';
import { space } from './space';
import type { Theme } from './types/theme';

export const lightTheme = {
  colors: colorsLight,
  space,
  font,
  components: {
    Banner: {
      success: {
        title: colorsLight.success.dark,
        background: colorsLight.white,
        border: colorsLight.success.primary,
        icon: colorsLight.success.dark,
        backgroundIcon: colorsLight.success.light,
        subtitle: colorsLight.neutral[80],
      },
      info: {
        title: colorsLight.info.dark,
        background: colorsLight.white,
        border: colorsLight.info.primary,
        icon: colorsLight.info.dark,
        backgroundIcon: colorsLight.info.light,
        subtitle: colorsLight.neutral[80],
      },
      warning: {
        title: colorsLight.warning.dark,
        background: colorsLight.white,
        border: colorsLight.warning.primary,
        icon: colorsLight.warning.dark,
        backgroundIcon: colorsLight.warning.light,
        subtitle: colorsLight.neutral[80],
      },
      error: {
        title: colorsLight.error.satured,
        background: colorsLight.white,
        border: colorsLight.error.primary,
        icon: colorsLight.error.satured,
        backgroundIcon: colorsLight.error.low,
        subtitle: colorsLight.neutral[80],
      },
    },
    Action: {
      primary: {
        default: {
          background: colorsLight.primary.primary,
          border: colorsLight.primary.primary,
          text: colorsLight.white,
          icon: '',
        },
        hover: {
          background: colorsLight.primary[50],
          border: colorsLight.primary[50],
          text: colorsLight.white,
          icon: '',
        },
        active: {
          background: colorsLight.primary[60],
          border: colorsLight.primary[60],
          text: colorsLight.white,
          icon: '',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
      secondary: {
        default: {
          background: colorsLight.primary[10],
          border: colorsLight.primary.primary,
          text: colorsLight.white,
          icon: '',
        },
        hover: {
          background: colorsLight.primary[20],
          border: colorsLight.primary[50],
          text: colorsLight.white,
          icon: '',
        },
        active: {
          background: colorsLight.primary[30],
          border: colorsLight.primary[60],
          text: colorsLight.white,
          icon: '',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
    },
  },
} as const satisfies Theme;

export const darkTheme = {
  colors: colorsDark,
  space,
  font: {
    ...font,
    color: 'white',
  },
  components: {
    Banner: {
      success: {
        title: colorsDark.success.dark,
        background: colorsDark.background.secondary,
        border: colorsDark.success.primary,
        icon: colorsDark.white,
        backgroundIcon: colorsDark.success.primary,
        subtitle: colorsDark.neutral[70],
      },
      info: {
        title: colorsDark.info.dark,
        background: colorsDark.background.secondary,
        border: colorsDark.info.primary,
        icon: colorsDark.white,
        backgroundIcon: colorsDark.info.primary,
        subtitle: colorsDark.neutral[70],
      },
      warning: {
        title: colorsDark.warning.dark,
        background: colorsDark.background.secondary,
        border: colorsDark.warning.primary,
        icon: colorsDark.white,
        backgroundIcon: colorsDark.warning.primary,
        subtitle: colorsDark.neutral[70],
      },
      error: {
        title: colorsDark.error.satured,
        background: colorsDark.background.secondary,
        border: colorsDark.error.primary,
        icon: colorsDark.white,
        backgroundIcon: colorsDark.error.primary,
        subtitle: colorsDark.neutral[70],
      },
    },
    Action: {
      primary: {
        default: {
          background: colorsLight.primary.primary,
          border: colorsLight.primary.primary,
          text: colorsLight.white,
          icon: '',
        },
        hover: {
          background: colorsLight.primary[50],
          border: colorsLight.primary[50],
          text: colorsLight.white,
          icon: '',
        },
        active: {
          background: colorsLight.primary[60],
          border: colorsLight.primary[60],
          text: colorsLight.white,
          icon: '',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
      secondary: {
        default: {
          background: colorsLight.primary[10],
          border: colorsLight.primary.primary,
          text: colorsLight.white,
          icon: '',
        },
        hover: {
          background: colorsLight.primary[20],
          border: colorsLight.primary[50],
          text: colorsLight.white,
          icon: '',
        },
        active: {
          background: colorsLight.primary[30],
          border: colorsLight.primary[60],
          text: colorsLight.white,
          icon: '',
        },
        focus: { background: '', text: '', icon: '', border: '' },
        disabled: { background: '', text: '', icon: '', border: '' },
      },
    },
  },
} as const satisfies Theme;
