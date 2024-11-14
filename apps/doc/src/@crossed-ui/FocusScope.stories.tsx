/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { FocusScope } from '@crossed/ui/src/other/FocusScope';
import { useRef } from 'react';
import { createStyles } from '@crossed/styled';
import { Box, Button } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FocusScope> = {
  component: FocusScope,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  render: (e) => {
    const style = useRef(
      createStyles(() => ({
        focus: { ':focus': { backgroundColor: 'green' } },
      }))
    ).current;
    return (
      <FocusScope {...e}>
        <Button style={style.focus}>
          <Button.Text>button</Button.Text>
        </Button>
      </FocusScope>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FocusScope>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    enabled: true,
  },
};

export const WithBoxChildren: Story = {
  args: {
    enabled: true,
    trapped: true,
  },
  render: (e) => {
    const style = useRef(
      createStyles(() => ({
        focus: { ':focus': { backgroundColor: 'green' } },
      }))
    ).current;
    return (
      <FocusScope {...e}>
        <Box>
          <Button style={style.focus}>
            <Button.Text>button</Button.Text>
          </Button>
        </Box>
      </FocusScope>
    );
  },
};
