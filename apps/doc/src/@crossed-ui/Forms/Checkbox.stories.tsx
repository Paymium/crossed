/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@crossed/ui/src/forms/Checkbox';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  subcomponents: {
    'Checkbox': Checkbox.Preset,
    'Checkbox.Label': Checkbox.Label,
    'Checkbox.Thumb': Checkbox.Thumb,
    'Checkbox.HelperText': Checkbox.HelperText,
    'Checkbox.Preset': Checkbox.Preset,
  },
  parameters: { layout: 'padded' },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: { onChecked: fn() },
  render(e) {
    return <Checkbox.Preset {...e} />;
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox.Preset>;

export const Primary: Story = {
  args: { label: 'My label', helperText: 'Helper text' },
};

export const DefaultChecked: Story = {
  args: { ...Primary.args, defaultChecked: true },
};

export const Disabled: Story = {
  args: { ...Primary.args, disabled: true },
};

export const NoThumb: Story = {
  args: { ...Primary.args },
};

type StoryCustom = StoryObj<typeof Checkbox>;

export const CustomPlacementThumb: StoryCustom = {
  args: { ...Primary.args },
  render(e) {
    return (
      <Checkbox {...e}>
        <Checkbox.Label>My label</Checkbox.Label>
        <Checkbox.Thumb />
      </Checkbox>
    );
  },
};
