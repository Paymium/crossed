import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useMounted } from 'nextra/hooks';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'nextra/icons';
import { Button, useThemeContext, tw } from '@mergeui/ui';

const config: DocsThemeConfig = {
  logo: <span>mergeui</span>,
  project: {
    link: 'https://github.com/mergeui/mergeui',
  },
  docsRepositoryBase: 'https://github.com/mergeui/mergeui',
  footer: {
    text: 'mergeui documentation',
  },
  themeSwitch: {
    component: function Component() {
      const { setTheme, theme } = useThemeContext();
      const { setTheme: setGlobalTheme } = useTheme();
      const mounted = useMounted();
      const IconToUse = mounted && theme === 'dark' ? MoonIcon : SunIcon;
      return (
        <Button
          className="self-center"
          onPress={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            tw.setColorScheme(newTheme);
            setGlobalTheme(newTheme);
            setTheme(newTheme);
          }}
        >
          <Button.Icon>
            <IconToUse />
          </Button.Icon>
        </Button>
      );
    },
  },
};

export default config;
