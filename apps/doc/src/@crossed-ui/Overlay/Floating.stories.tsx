/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Button, Text, Select } from '@crossed/ui';
import { Floating } from '@crossed/ui/src/overlay/Floating';
import { inlineStyle } from '@crossed/styled';
import { useState } from 'react';

const meta: Meta<typeof Floating> = {
  component: Floating,
  parameters: { layout: '' },
  subcomponents: {
    'Floating.Trigger': Floating.Trigger,
    'Floating.Content': Floating.Content,
    'Floating.VisibilityHidden': Floating.VisibilityHidden,
    'Floating.Overlay': Floating.Overlay,
    'Floating.Portal': Floating.Portal,
  },
  render({ closeOnPress, ...e }: any) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Floating {...e}>
          <Floating.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Floating.Trigger>
          <Floating.Portal>
            <Floating.Overlay />
            <Floating.Content>
              <Text>Hello world</Text>
              <Floating.Trigger asChild>
                <Button>
                  <Button.Text>close</Button.Text>
                </Button>
              </Floating.Trigger>
            </Floating.Content>
          </Floating.Portal>
        </Floating>
      </YBox>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const VisibilityHidden: Story = {
  args: {},
  render({ closeOnPress, ...e }: any) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Floating {...e}>
          <Floating.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Floating.Trigger>
          <Floating.Portal>
            <Floating.Overlay />
            <Floating.VisibilityHidden>
              <Text>Hello world</Text>
              <Floating.Trigger asChild>
                <Button>
                  <Button.Text>close</Button.Text>
                </Button>
              </Floating.Trigger>
            </Floating.VisibilityHidden>
          </Floating.Portal>
        </Floating>
      </YBox>
    );
  },
};

const Render = () => {
  const [state, setState] = useState('');
  return (
    <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
      <Floating>
        <Floating.Trigger asChild>
          <Button>
            <Button.Text>Button</Button.Text>
          </Button>
        </Floating.Trigger>
        <Floating.Portal>
          <Floating.Overlay />
          <Floating.VisibilityHidden>
            <Text>Hello world</Text>
            <Select
              value={state}
              onChange={setState as any}
              items={[
                { value: 'one', label: 'one' },
                { value: 'two', label: 'two' },
                { value: 'three', label: 'three' },
              ]}
            />
            <Floating.Trigger asChild>
              <Button>
                <Button.Text>close</Button.Text>
              </Button>
            </Floating.Trigger>
          </Floating.VisibilityHidden>
        </Floating.Portal>
      </Floating>
    </YBox>
  );
};
export const ChangeParentState: Story = {
  args: {},
  render: Render,
};
