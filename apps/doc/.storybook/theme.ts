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

  textColor: themes.light.colors.text.primary.default,

  fontBase: '"Inter", "Open Sans"',
  fontCode: '"Inter"',

  colorPrimary: themes.light.colors.text.primary.default,
  colorSecondary: themes.light.colors.text.secondary.default,

  // UI
  appBg: themes.light.colors.background.secondary.default,
  appContentBg: themes.light.colors.background.secondary.default,
  appPreviewBg: themes.light.colors.background.primary.default,
  appBorderColor: themes.light.colors.border.primary.default,
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: themes.light.colors.text.brand.primary.default,
  barSelectedColor: themes.light.colors.background.brand.primary.default,
  barHoverColor: themes.light.colors.background.brand.primary.alt,
  barBg: themes.light.colors.background.secondary.default,

  inputBorder: themes.light.colors.border.primary.default,
  inputBg: themes.light.colors.background.primary.default,
  inputTextColor: themes.light.colors.text.primary.default,
  //
  buttonBg: themes.light.colors.background.primary.default,
} as const;
export const dark: ThemeVarsPartial = {
  base: 'dark',
  brandTitle: 'Crossed',
  brandUrl: isDev ? '/' : '/crossed',
  brandImage: isDev ? '/logo.png' : '/crossed/logo.png',
  brandTarget: '_self',

  textColor: themes.dark.colors.text.primary.default,

  fontBase: '"Inter", "Open Sans"',
  fontCode: '"Inter"',

  colorPrimary: themes.dark.colors.text.primary.default,
  colorSecondary: themes.dark.colors.text.secondary.default,

  // UI
  appBg: themes.dark.colors.background.primary.default,
  appContentBg: themes.dark.colors.background.secondary.default,
  appPreviewBg: themes.dark.colors.background.primary.default,
  appBorderColor: themes.dark.colors.border.primary.default,
  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: themes.dark.colors.text.brand.primary.default,
  barSelectedColor: themes.dark.colors.background.brand.primary.default,
  barHoverColor: themes.dark.colors.background.brand.primary.alt,
  barBg: themes.dark.colors.background.secondary.default,

  inputBorder: themes.dark.colors.border.primary.default,
  inputBg: themes.dark.colors.background.primary.default,
  inputTextColor: themes.dark.colors.text.primary.default,

  buttonBg: themes.dark.colors.background.primary.default,
  buttonBorder: themes.dark.colors.background.primary.default,
} as const;
export const lightStoryBook = create(light);
export const darkStoryBook = create(dark);
