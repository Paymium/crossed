import { create } from '@storybook/theming';

import { themes } from '@crossed/theme';

export default create({
  base: 'light',
  brandTitle: 'Crossed',
  brandUrl: '/crossed',
  brandImage: '/logo.png',
  brandTarget: '_self',

  // colorPrimary: themes.light.colors.primary[1],
  // colorSecondary: themes.light.colors.primary[0],


  // // UI
  // appBg: themes.light.colors.background.primary,
  // appContentBg: themes.light.colors.background.secondary,
  // appPreviewBg: themes.light.colors.background.primary,
  // appBorderColor: themes.light.colors.border.primary,
  // appBorderRadius: 4,

  // // Text colors
  // textColor: themes.light.colors.text.primary,
  // textInverseColor: themes.light.colors.text.brand,

  // // Toolbar default and active colors
  // barTextColor: themes.light.colors.text.secondary,
  // barSelectedColor: themes.light.colors.text.brand,
  // barHoverColor: themes.light.colors.text.primary,
  // barBg: themes.light.colors.background.primary,
 
  // // Form colors
  // inputBg: themes.light.colors.background.primary,
  // inputBorder: themes.light.colors.border.primary,
  // inputTextColor: themes.light.colors.text.secondary,
  // inputBorderRadius: 2,
});
