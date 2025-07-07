import "../style.config";
import "virtual:crossed.css";
import type { Preview } from "@storybook/react";
import { PortalProvider } from '@gorhom/portal';
import * as React from 'react';

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  tags: ["autodocs"],
  decorators : [
    (Story) => (
      <PortalProvider>
          <Story />
      </PortalProvider>
    ),
  ]
};

export default preview;

