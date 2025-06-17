/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch, SwitchPreset } from '@crossed/ui/src/forms/Switch/index';
import { Button, XBox, Badge } from '@crossed/ui';

// Configuration de la story
const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultValue: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const ControlledSwitch = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <XBox space={'md'}>
      <Button
        onPress={() => {
          setChecked(!checked);
        }}
      >
        <Button.Text>Control switch</Button.Text>
      </Button>
      <Switch
        value={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        {...args}
      >
        <Switch.Thumb />
      </Switch>
    </XBox>
  );
};

export const Primary: Story = {
  render: (args) => {
    return (
      <Switch {...args}>
        <Switch.Thumb />
        <Switch.Label>My Label</Switch.Label>
      </Switch>
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <Switch {...args}>
        <Switch.Thumb />
      </Switch>
    );
  },
};
export const CustomLabel: Story = {
  render: (args) => {
    return (
      <Switch {...args}>
        <Switch.Thumb />
        <Switch.Label>
          <Badge variant={'success'}><Badge.Text>Custom Label</Badge.Text></Badge>
        </Switch.Label>
      </Switch>
    );
  },
};

export const Preset: Story = {
  render: (args) => {
    return <SwitchPreset label={'MyLabel'} {...args} />;
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const DisabledOn: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
    defaultValue: true,
  },
};

export const DisabledWithoutLabel: Story = {
  ...WithoutLabel,
  args: { disabled: true },
};

export const DisabledOnWithoutLabel: Story = {
  ...WithoutLabel,
  args: { disabled: true, defaultValue: true },
};

export const SwitchControlledByAnotherElement: Story = {
  render: (args) => {
    return <ControlledSwitch {...args} />;
  },
};
