import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: '@crossed⁄ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  render(e) {
    return (
      <Button {...e}>
        <Button.Text>Button</Button.Text>
      </Button>
    );
  },
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { variant: 'primary', loading: false, disabled: false, error: false },
};
export const Secondary: Story = {
  args: { ...Primary.args, variant: 'secondary' },
};
export const tertiary: Story = {
  args: { ...Primary.args, variant: 'tertiary' },
};
