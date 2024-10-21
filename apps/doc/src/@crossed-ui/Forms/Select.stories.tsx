/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { SelectNew } from '@crossed/ui/src/forms/SelectNew';
import { YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SelectNew> = {
  component: SelectNew,
  subcomponents: {
    'Select.Trigger': SelectNew.Trigger,
    // 'Select.Trigger.Text': Select.Trigger.Text,
    'Select.Value': SelectNew.Value,
    'Select.Content': SelectNew.Content,
    'Select.Option': SelectNew.Option,
  },
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    clearable: { control: 'boolean' },
    error: { control: 'text' },
    description: { control: 'text' },
    extra: { control: 'text' },
  },
  render: (e) => (
    <YBox {...e} style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <SelectNew>
        <SelectNew.Trigger>
          <SelectNew.Value />
        </SelectNew.Trigger>
        <SelectNew.Content>
          <SelectNew.Option value="Select 1">Select 1</SelectNew.Option>
          <SelectNew.Option value="Select 2">Select 2</SelectNew.Option>
        </SelectNew.Content>
      </SelectNew>
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
