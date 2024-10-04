import '../src/style.config';
import * as React from 'react';
import type { Preview } from '@storybook/react';
import { PortalProvider } from '@gorhom/portal';
import { light, dark } from './theme';
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from 'storybook-dark-mode';
import { addons } from '@storybook/preview-api';
import { Registry } from '@crossed/styled';

const channel = addons.getChannel();

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error
  import('./style.css');
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    darkMode: {
      current: 'light',
      dark: { ...dark },
      light: { ...light },
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },

    backgrounds: {
      default: 'Primary',
      values: [
        { name: 'Primary', value: 'var(--colors-background-primary)' },
        { name: 'Secondary', value: 'var(--colors-background-secondary)' },
      ]
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <PortalProvider>
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    </PortalProvider>
  ),
];

const ThemeProvider = ({ children }) => {
  React.useEffect(() => {
    const setDark = (e: boolean) => {
      Registry.setThemeName(e ? 'dark' : 'light');
    };
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel]);
  return children;
};

// export const parameters = {
//   darkMode: {
//     current: 'light',
//     // Override the default dark theme
//     dark: {...dark},
//     // Override the default light theme
//     light: {...light},
//     darkClass: 'dark',
//     lightClass: 'light',
//     classTarget: 'html',
//     stylePreview: true,
//   },
// };
