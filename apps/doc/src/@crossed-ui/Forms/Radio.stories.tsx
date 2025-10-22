/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from '@crossed/ui/src/forms/Radio';
import { alignSelfStyle, YBox } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Radio> = {
  component: Radio,
  subcomponents: {
    'Radio.Item': Radio.Item,
    'Radio.ItemPreset': Radio.ItemPreset,
    'Radio.Thumb': Radio.Thumb,
    'Radio.Label': Radio.Label,
    'Radio.HelperText': Radio.HelperText,
  },
  parameters: { layout: 'padded' },
  argTypes: {},
  render: () => {
    return (
      <Radio>
        <Radio.ItemPreset
          value={'1'}
          label={'My label'}
          helperText={'Helper text'}
        />
        <Radio.ItemPreset
          value={'2'}
          label={'My label 1'}
          helperText={'Helper text 1'}
        />
        <Radio.ItemPreset
          value={'3'}
          label={'My label 2'}
          helperText={'Helper text 2'}
        />
        <Radio.ItemPreset
          value={'4'}
          disabled
          label={'Radio disabled'}
          helperText={'disabled for demo'}
        />
      </Radio>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { ...Primary.args },
};

export const DisabledChecked: Story = {
  args: { ...Primary.args },
};

export const CustomRender: Story = {
  args: { ...Primary.args },
  render: () => {
    return (
      <Radio>
        <Radio.Item value={'1'}>
          <YBox>
            <Radio.Label>My label</Radio.Label>
            <Radio.HelperText>Helper text</Radio.HelperText>
          </YBox>
          <Radio.Thumb style={alignSelfStyle['flex-start']} />
        </Radio.Item>
        <Radio.ItemPreset
          value={'2'}
          label={'My label 1'}
          helperText={'Helper text 1'}
        />
        <Radio.ItemPreset
          value={'3'}
          label={'My label 2'}
          helperText={'Helper text 2'}
        />
        <Radio.ItemPreset
          value={'4'}
          disabled
          label={'Radio disabled'}
          helperText={'disabled for demo'}
        />
      </Radio>
    );
  },
};
