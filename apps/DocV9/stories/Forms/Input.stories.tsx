/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@crossed/ui/src/forms/Input';
import { Text } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    clearable: { control: 'boolean' },
    // elementLeft?: ReactNode;
    // elementRight?: ReactNode;
    error: { control: 'text' },
    description: { control: 'text' },
    extra: { control: 'text' },
    disabled: { control: 'boolean' },
    // style?: CrossedMethods<any>;
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  args: {
    label: 'My label',
    description: 'Your description',
    extra: '',
    clearable: false,
    error: '',
    disabled: false,
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};
export const Clearabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    clearable: true,
  },
};

export const Error: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    error: 'One error',
  },
};

export const WithRightElement: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    elementRight: <Text>Right</Text>,
  },
};
export const WithRightElementClearable: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    clearable: true,
    value: 'one value',
    elementRight: <Text>Right</Text>,
  },
};
export const WithLeftElement: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    elementLeft: <Text>Left</Text>,
    value: 'one value',
  },
};
