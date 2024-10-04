/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { Theme, Colors, Font, Spaces } from '@crossed/theme';

type CustomTheme = Theme & { boxShadow: string };

const primary = {
  0: '#F4F2FC',
  1: '#EBEAFE',
  10: '#DAD9EC',
  20: '#CDCBEC',
  30: '#A6A1E9',
  40: '#9088F7',
  50: '#2606C0',
  60: '#1E078F',
  70: '#2D2D61',
  80: '#242547',
  90: '#1D1D40',
  100: '#141430',
  primary: '#4737FF',
} as const;

const neutral = {
  100: '#141430',
  90: '#1D1D4C',
  80: '#5D607C',
  70: '#AEB6CE',
} as const;

export const paymiumLight = {
  primary,
  black: 'black',
  white: 'white',
  text: {
    primary: 'black',
    secondary: neutral[80],
    brand: primary.primary,
    invert: 'white',
  },
  background: {
    primary: primary[0],
    secondary: 'white',
    brand: primary.primary,
    hover: primary[1],
    active: primary[10],
  },
  border: {
    primary: primary[1],
    secondary: neutral[70],
    tertiary: primary[70],
    brand: primary.primary,
  },
  error: {
    primary: '#EF4444',
    muted: '#D73636',
    satured: '#A21A1A',
    low: '#FFE6E6',
    hight: '#FEC4C4',
  },
  info: {
    dark: '#285F9B',
    light: '#EEF6FF',
    primary: '#93C5FD',
  },
  success: {
    dark: '#188551',
    light: '#EDFFF6',
    primary: '#3ABB7D',
  },
  warning: {
    dark: '#AD5C23',
    light: '#FFF0E6',
    primary: '#F97316',
  },
  neutral,
} as const satisfies Colors;

export const paymiumDark = {
  primary,
  black: 'black',
  white: 'white',
  text: {
    primary: 'white',
    secondary: primary[20],
    brand: primary[40],
    invert: 'black',
  },
  background: {
    primary: primary[100],
    secondary: primary[90],
    brand: primary[40],
    hover: primary[70],
    active: primary[80],
  },
  border: {
    primary: primary[90],
    secondary: primary[70],
    tertiary: primary[70],
    brand: primary[40],
  },
  error: {
    primary: '#EF4444',
    muted: '#D73636',
    satured: '#A21A1A',
    low: '#FFE6E6',
    hight: '#FEC4C4',
  },
  info: {
    dark: '#285F9B',
    light: '#EEF6FF',
    primary: '#93C5FD',
  },
  success: {
    dark: '#188551',
    light: '#EDFFF6',
    primary: '#3ABB7D',
  },
  warning: {
    dark: '#AD5C23',
    light: '#FFF0E6',
    primary: '#F97316',
  },
  neutral: {
    100: '#141430',
    90: '#1D1D4C',
    80: '#5D607C',
    70: '#AEB6CE',
  },
} as const satisfies Colors;

const paymiumFont = {
  lineHeight: {
    xs: 14,
    sm: 17,
    md: 20,
    lg: 23,
    xl: 30,
    h6: 36,
    h5: 40,
    h4: 46,
    h3: 50,
    h2: 56,
    h1: 60,
  },
  fontSize: {
    xs: 11,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    h6: 28,
    h5: 32,
    h4: 36,
    h3: 40,
    h2: 44,
    h1: 48,
  },
  fontWeight: {
    xs: '400',
    sm: '400',
    md: '400',
    lg: '600',
    xl: '700',
    h6: '700',
    h5: '700',
    h4: '700',
    h3: '700',
    h2: '700',
    h1: '700',
  },
  color: 'black',
  family: 'Overpass',
} as const satisfies Font;

export const space = {
  xxs: 8,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
  xxl: 72,
} as const satisfies Spaces;

export const paymiumThemeDark = {
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
} as const satisfies CustomTheme;
export const paymiumTheme = {
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
} as const satisfies CustomTheme;

export const themes = {
  dark: paymiumThemeDark,
  light: paymiumTheme,
};
type ThemesCustom = typeof themes;

declare module '@crossed/styled' {
  export interface Themes extends ThemesCustom {}
}
