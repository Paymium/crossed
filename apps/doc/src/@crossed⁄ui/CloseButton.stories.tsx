import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { CloseButton } from '@crossed/ui/src/other/CloseButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CloseButton> = {
  title: '@crossed⁄ui/CloseButton',
  component: CloseButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
