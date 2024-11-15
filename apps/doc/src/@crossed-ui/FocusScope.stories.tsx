/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  FocusScope,
  type FocusScopeProps,
} from '@crossed/ui/src/other/FocusScope';
import { useRef, useState } from 'react';
import { createStyles } from '@crossed/styled';
import { Box, Button, YBox } from '@crossed/ui';

const Render = (e: FocusScopeProps) => {
  const [enable, setEnable] = useState(false);
  const style = useRef(
    createStyles(() => ({
      focus: { ':focus': { backgroundColor: 'green' } },
    }))
  ).current;
  return (
    <YBox space="md">
      <Button onPress={() => setEnable(!enable)}>
        <Button.Text>{!enable ? 'Focus' : 'Blur'}</Button.Text>
      </Button>
      <FocusScope {...e} enabled={enable}>
        <Button variant="secondary" style={style.focus}>
          <Button.Text>button</Button.Text>
        </Button>
      </FocusScope>
    </YBox>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FocusScope> = {
  component: FocusScope,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
  render: Render,
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    enabled: true,
  },
};

const Render2 = (e: FocusScopeProps) => {
  const [enable, setEnable] = useState(false);
  const ref = useRef();
  const style = useRef(
    createStyles(() => ({
      focus: { ':focus': { backgroundColor: 'green' } },
    }))
  ).current;
  return (
    <YBox space="md">
      <Button onPress={() => setEnable(!enable)}>
        <Button.Text>{!enable ? 'Focus' : 'Blur'}</Button.Text>
      </Button>
      <FocusScope {...e} enabled={enable}>
        {(p) => (
          <Box>
            <Button variant="secondary" style={style.focus} {...p}>
              <Button.Text>button</Button.Text>
            </Button>
          </Box>
        )}
      </FocusScope>
    </YBox>
  );
};

export const WithBoxChildren: Story = {
  args: {
    enabled: true,
    trapped: true,
  },
  render: Render2,
};
