/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { CloseButton } from '@crossed/ui/src/buttons/CloseButton';
import { XBox } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CloseButton> = {
  component: CloseButton,
  parameters: { layout: 'centered' },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
  render: () => {
    return (
      <XBox>
        <CloseButton size={'sm'} />
        <CloseButton size={'md'} />
        <CloseButton size={'lg'} />
      </XBox>
    );
  },
};
