/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '@crossed/ui/src/forms/Select';
import { YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Select> = {
  component: Select,
  subcomponents: {
    'Select.Trigger': Select.Trigger,
    'Select.Trigger.Text': Select.Trigger.Text,
    'Select.Value': Select.Value,
    'Select.Content': Select.Content,
    'Select.Option': Select.Option,
    'Select.Option.Text': Select.Option.Text,
  },
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    clearable: { control: 'boolean' },
    error: { control: 'text' },
    description: { control: 'text' },
    extra: { control: 'text' },
  },
  render: (e) => (
    <YBox style={inlineStyle(() => ({ base: { minWidth: 600 } }))}>
      <Select {...e}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Option value="Select 1">
            <Select.Option.Text>Select 1</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 2">
            <Select.Option.Text>Select 2</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 3">
            <Select.Option.Text>Select 3</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 4">
            <Select.Option.Text>Select 4</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 5">
            <Select.Option.Text>Select 5</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 6">
            <Select.Option.Text>Select 6</Select.Option.Text>
          </Select.Option>
          <Select.Option value="Select 7">
            <Select.Option.Text>Select 7</Select.Option.Text>
          </Select.Option>
        </Select.Content>
      </Select>
    </YBox>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

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
  },
};
export const Multiple: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    multiple: true,
  },
};
