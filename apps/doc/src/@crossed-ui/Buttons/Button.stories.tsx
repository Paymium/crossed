/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@crossed/ui/src/forms/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  component: Button,
  subcomponents: {
    'Button.Text': Button.Text,
    'Button.Element': Button.Element,
    'Button.Group': Button.Group,
    'Button.Icon': Button.Icon,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-299&t=2ZiT8Ks6ZLwLW9X6-4',
    },
    docs: { description: { component: 'Button component' } },
  },
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-317&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};
export const tertiary: Story = {
  args: { ...Primary.args, variant: 'tertiary' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ke8D4tdGD8lCjNYY5NO33R/Design-system?node-id=3-301&t=2ZiT8Ks6ZLwLW9X6-4',
    },
  },
};
