/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { DateInput } from '@crossed/ui/src/forms/DateInput';
import { Text } from '@crossed/ui/src/typography/Text';
import { Modal } from '@crossed/ui/src/overlay/Modal';
import { inlineStyle } from '@crossed/styled';
import { Select } from '@crossed/ui/src/forms/Select';
import { YBox } from '@crossed/ui/src/layout/YBox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DateInput> = {
  component: DateInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    locale: { control: 'select', options: ['default', 'en', 'fr'] },
    format: { control: 'text', value: 'yyyy-mm-dd' },
  },
  args: { locale: 'default', onChange: ()=>{} },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = { args: {} };
export const WithLabel: Story = {
  args: {
    label: 'Label input',
    description: 'one description',
    extra: 'one extra',
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: { day: 'day (dd)', month: 'month (mm)', year: 'year (yyyy)' },
  },
};
export const WithPicker: Story = { args: { picker: true } };
export const WithValue: Story = { args: { value: new Date() } };
export const OnlyYearMonth: Story = { args: { format: 'yyyy-mm' } };
export const BigWidth: Story = {
  render: () => {
    return (
      <YBox style={inlineStyle(() => ({ base: { width: 700 } }))}>
        <DateInput picker />
      </YBox>
    );
  },
};
export const InModal: Story = {
  args: { format: 'yyyy-mm' },
  render: () => {
    return (
      <Modal size={'md'}>
        <Modal.Trigger>
          <Text>Click here</Text>
        </Modal.Trigger>
        <Modal.Content
          style={inlineStyle(() => ({
            base: { minHeight: 200, minWidth: 500 },
          }))}
        >
          <Modal.Header>
            <Modal.Title>In Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select items={[]} />
            <DateInput picker />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Trigger>
              <Text>Close</Text>
            </Modal.Trigger>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};
