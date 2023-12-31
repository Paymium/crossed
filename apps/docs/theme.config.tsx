import React, { useMemo } from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useFSRoute, useMounted } from 'nextra/hooks';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'nextra/icons';
import { Button, useCrossedTheme, Badge, XBox, Text } from '@crossed/ui';
import { tw } from '@crossed/styled';
import { Navbar } from 'components/NavBar';

const config: DocsThemeConfig = {
  navbar: {
    component: Navbar,
  },
  logo: (
    <span className="flex flex-row items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="24"
        height="24"
        viewBox="5 5 90 90"
      >
        <g fill="#0f79d7">
          <path d="M5 70.48l19.108-19.108a2.029 2.029 0 0 0 0-2.87L5.058 29.45l7.545-7.546 21.89 21.89a8.685 8.685 0 0 1 0 12.283L12.659 77.912 5 70.48zm90-41.03L75.892 48.559a2.029 2.029 0 0 0 0 2.87l19.05 19.051-7.545 7.546-21.89-21.89a8.685 8.685 0 0 1 0-12.283l21.834-21.834L95 29.45zM29.428 5l19.108 19.108a2.029 2.029 0 0 0 2.87 0l19.052-19.05 7.546 7.545-21.89 21.89a8.685 8.685 0 0 1-12.283 0L21.997 12.659 29.428 5zm41.144 90L51.463 75.892a2.029 2.029 0 0 0-2.87 0l-19.051 19.05-7.546-7.545 21.89-21.89a8.685 8.685 0 0 1 12.283 0l21.834 21.834L70.572 95z"></path>
        </g>
      </svg>
      <Text size="lg">crossed</Text>
    </span>
  ),
  sidebar: {
    titleComponent: function TitleComponent({ title, route, type }) {
      const FSRoute = useFSRoute();
      const [routeOriginal] = FSRoute.split('#');
      const active = [routeOriginal, routeOriginal + '/'].includes(route + '/');
      let render = null;
      if (title.includes('[beta]')) {
        render = (
          <>
            {render}
            <Badge
              color="blue"
              text="BETA"
              variant={active ? 'filled' : 'outlined'}
            />
          </>
        );
      }
      if (title.includes('[api-draft]')) {
        render = (
          <>
            {render}
            <Badge
              color="orange"
              text="API-DRAFT"
              variant={active ? 'filled' : 'outlined'}
            />
          </>
        );
      }
      if (title.includes('[doc]')) {
        render = (
          <>
            {render}
            <Badge
              color="yellow"
              text="DOC-DRAFT"
              variant={active ? 'filled' : 'outlined'}
            />
          </>
        );
      }
      return (
        <XBox center className="justify-between">
          <Text
            size={false}
            color={type === 'separator' || active ? 'default' : 'neutral'}
          >
            {title.replace(/\[(doc|beta|alpha|api-draft)\]/g, '')}
          </Text>
          <XBox space="xs" className="w-auto">
            {render}
          </XBox>
        </XBox>
      );
    },
  },
  project: {
    link: 'https://github.com/Paymium/crossed',
  },
  banner: {
    text: 'Crossed is not ready production',
  },
  docsRepositoryBase: 'https://github.com/Paymium/crossed/tree/main/apps/docs',
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
      <link rel="icon" href="/favicon.png" />
    </>
  ),
  themeSwitch: {
    component: function Component() {
      const { setTheme, theme } = useCrossedTheme();
      const { setTheme: setGlobalTheme, theme: globalTheme } = useTheme();
      const mounted = useMounted();
      useMemo(() => {
        if (globalTheme !== theme) {
          // setTheme(globalTheme as any);
        }
      }, []);
      const IconToUse = mounted && theme === 'dark' ? MoonIcon : SunIcon;
      return (
        <Button
          aria-label="Change color theme"
          className="self-center"
          onPress={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            tw.setColorScheme(newTheme);
            setGlobalTheme(newTheme);
            setTheme(newTheme);
          }}
        >
          <Button.Element>
            <IconToUse />
          </Button.Element>
        </Button>
      );
    },
  },
};

export default config;
