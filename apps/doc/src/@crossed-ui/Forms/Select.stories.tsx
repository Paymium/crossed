/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '@crossed/ui/src/forms/Select';
import { countries } from './countriesFixtures';
import { Modal, YBox, Text } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

const items = [
  { value: 'Select 1', label: 'Select 1' },
  { value: 'Select 2', label: 'Select 2' },
  { value: 'Select 3', label: 'Select 3' },
  { value: 'Select 4', label: 'Select 4' },
  { value: 'Select 5', label: 'Select 5' },
  { value: 'Select 6', label: 'Select 6' },
  { value: 'Select 7', label: 'Select 7' },
  { value: 'Select 8', label: 'Select 8' },
  { value: 'Select 9', label: 'Select 9' },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    clearable: { control: 'boolean' },
    error: { control: 'text' },
    description: { control: 'text' },
    extra: { control: 'text' },
  },
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
    items,
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
  args: { ...Primary.args, error: 'One error' },
};

export const WithRightElement: Story = {
  ...Primary,
  args: { ...Primary.args },
};

export const Multiple: Story = {
  ...Primary,
  args: { ...Primary.args, multiple: true },
};

export const Searchable: Story = {
  ...Primary,
  args: { ...Primary.args, searchable: true },
};

export const SearchablePerf: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    searchable: true,
    items: countries.map((country) => ({
      label: country.name_fr,
      value: country.iso_alpha2,
      search: country.name_fr,
    })),
  },
};

export const SearchableMultible: Story = {
  ...SearchablePerf,
  args: { ...SearchablePerf.args, searchable: true, multiple: true },
};

export const SelectInDialog: Story = {
  ...Primary,
  args: { ...Primary.args },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { minWidth: 600 } }))}>
        <Modal size={'md'}>
          <Modal.Trigger>
            <Text>Button</Text>
          </Modal.Trigger>
          <Modal.Content>
            <YBox style={inlineStyle(() => ({ base: { minWidth: 600 } }))}>
              <Select {...e} />
            </YBox>
          </Modal.Content>
        </Modal>
      </YBox>
    );
  },
};
