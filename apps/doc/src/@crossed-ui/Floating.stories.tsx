/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { YBox, Button, Text } from '@crossed/ui';
import { Floating } from '@crossed/ui/src/overlay/Floating';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Floating> = {
  component: Floating,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Floating.Trigger': Floating.Trigger,
    'Floating.Content': Floating.Content,
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
              <Button>
                <Button.Text>focus</Button.Text>
              </Button>
            </Floating.Content>
          </Floating.Portal>
        </Floating>
      </YBox>
    );
  },
  argTypes: {
    visibilityHidden: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
