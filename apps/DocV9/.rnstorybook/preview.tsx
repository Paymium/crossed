import "./style.config";
import type { Preview } from '@storybook/react';
import { Box } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#000' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Box  style={(inlineStyle(({space }) => ({ base: {padding: space.md} })))}>
        <Story />
      </Box>
    ),
  ],
};


export default preview;
