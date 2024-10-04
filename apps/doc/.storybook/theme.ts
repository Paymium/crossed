import { create, ThemeVarsPartial } from '@storybook/theming';

import { themes } from '@crossed/theme';
// @ts-ignore
const isDev = process.env.NODE_ENV === 'development';

export const light: ThemeVarsPartial = {
  base: 'light',
  brandTitle: 'Crossed',
  brandUrl: isDev ? '/' : '/crossed',
  brandImage: isDev ? '/logo.png' : '/crossed/logo.png',
  brandTarget: '_self',

  textColor: themes.light.colors.text.primary,

  fontBase: '"Overpass", "Open Sans"',
  fontCode: '"Overpass"',

  colorPrimary: themes.light.colors.primary.primary,
  colorSecondary: themes.light.colors.background.brand,

  // UI
  appBg: themes.light.colors.background.secondary,
  appContentBg: themes.light.colors.background.secondary,
  appPreviewBg: themes.light.colors.background.primary,
  appBorderColor: themes.light.colors.border.primary,
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: themes.light.colors.text.brand,
  barSelectedColor: themes.light.colors.background.brand,
  barHoverColor: themes.light.colors.background.hover,
  barBg: themes.light.colors.background.secondary,

  inputBorder: themes.light.colors.border.secondary,
  inputTextColor: themes.light.colors.text.primary,

  buttonBg: themes.light.colors.background.primary,
} as const;
export const dark: ThemeVarsPartial = {
  base: 'dark',
  brandTitle: 'Crossed',
  brandUrl: isDev ? '/' : '/crossed',
  brandImage: isDev ? '/logo.png' : '/crossed/logo.png',
  brandTarget: '_self',

  textColor: themes.dark.colors.text.primary,

  fontBase: '"Overpass", "Open Sans"',
  fontCode: '"Overpass"',

  colorPrimary: themes.dark.colors.primary.primary,
  colorSecondary: themes.dark.colors.background.brand,

  // UI
  appBg: themes.dark.colors.background.secondary,
  appContentBg: themes.dark.colors.background.secondary,
  appPreviewBg: themes.dark.colors.background.primary,
  appBorderColor: themes.dark.colors.border.primary,
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: themes.dark.colors.text.brand,
  barSelectedColor: themes.dark.colors.background.brand,
  barHoverColor: themes.dark.colors.background.hover,
  barBg: themes.dark.colors.background.secondary,

  inputBorder: themes.dark.colors.background.primary,
  inputBg: themes.dark.colors.background.primary,
  inputTextColor: themes.dark.colors.text.primary,

  buttonBg: themes.dark.colors.background.primary,
  buttonBorder: themes.dark.colors.background.primary,
} as const;
export const lightStoryBook = create(light);
export const darkStoryBook = create(dark);
