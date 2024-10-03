import '../src/style.config';
import './style.css';
import * as React from 'react';
import type { Preview } from '@storybook/react';
import { PortalProvider } from '@gorhom/portal';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => (
    <PortalProvider>
      <Story />
    </PortalProvider>
  ),
];
