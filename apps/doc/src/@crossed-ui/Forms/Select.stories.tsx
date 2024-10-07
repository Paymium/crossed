/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '@crossed/ui/src/forms/Select';
import { Text, YBox } from '@crossed/ui';
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
  },
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    clearable: { control: 'boolean' },
    // elementLeft?: ReactNode;
    // elementRight?: ReactNode;
    error: { control: 'text' },
    description: { control: 'text' },
    extra: { control: 'text' },
    // disabled: { control: 'boolean' },
    // style?: CrossedMethods<any>;
  },
  render: (e) => (
    <YBox {...e} style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Select>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Option value="Select 1">Select 1</Select.Option>
          <Select.Option value="Select 2">Select 2</Select.Option>
        </Select.Content>
      </Select>
    </YBox>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

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
    // disabled: false,
  },
};

// export const Disabled: Story = {
//   ...Primary,
//   args: {
//     ...Primary.args,
//     disabled: true,
//   },
// };
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
