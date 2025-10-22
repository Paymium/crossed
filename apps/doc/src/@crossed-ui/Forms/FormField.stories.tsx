/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from 'react-native';

import { FormField } from '@crossed/ui/src/forms/Form';
import { Card } from '@crossed/ui/src/display/Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FormField> = {
  component: FormField,
  subcomponents: {
    'FormField.Error': FormField.Error,
    'FormField.Control': FormField.Control,
    'FormField.Label': FormField.Label,
    'FormField.Helper': FormField.Helper,
  },
  parameters: { layout: 'centered' },
  args: {},
  render() {
    return (
      <Card>
        <FormField>
          <FormField.Label>Label</FormField.Label>
          <FormField.Control>
            <TextInput style={{ borderWidth: 1, borderColor: 'black' }} />
          </FormField.Control>
        </FormField>
      </Card>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
