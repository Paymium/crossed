import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useMounted } from 'nextra/hooks';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'nextra/icons';
import { Button, useThemeContext, tw } from '@crossed/ui';

const config: DocsThemeConfig = {
  logo: (
    <span className="flex flex-row items-center gap-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 6.5615616 12.396698"
        version="1.1"
      >
        <g transform="translate(-111.7855,-153.67251)">
          <rect
            fill="currentColor"
            strokeWidth="0.162002"
            fillOpacity="1"
            width="10.078526"
            height="1.5204298"
            x="155.99068"
            y="-113.30594"
            transform="rotate(90)"
          />
          <rect
            fill="currentColor"
            strokeWidth="0.0609394"
            fillOpacity="1"
            width="1.4261072"
            height="1.5204298"
            x="153.67252"
            y="-113.30762"
            transform="rotate(90)"
          />
          <rect
            fill="currentColor"
            strokeWidth="0.136255"
            fillOpacity="1"
            width="7.129498"
            height="1.5204298"
            x="-197.55099"
            y="-31.703402"
            transform="rotate(-135)"
          />
          <rect
            fill="currentColor"
            strokeWidth="0.130668"
            fillOpacity="1"
            width="6.5568142"
            height="1.5204298"
            x="111.78551"
            y="164.54877"
          />
        </g>
      </svg>
      crossed
    </span>
  ),
  project: {
    link: 'https://github.com/crossed/crossed',
  },
  banner: {
    text: 'Crossed is not ready production',
  },
  docsRepositoryBase: 'https://github.com/crossed/crossed/tree/main/apps/docs',
  footer: {
    text: 'crossed documentation',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Crossed',
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Crossed" />
      <meta
        property="og:description"
        content="Crossed is cross platform library for react-native and react web"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
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
