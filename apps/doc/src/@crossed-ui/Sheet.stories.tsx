/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Button, Sheet, Text, YBox } from '@crossed/ui';
import { inlineStyle } from '@crossed/styled';

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Content': Sheet.Content,
    'Sheet.ScrollView': Sheet.ScrollView,
    'Sheet.FlatList': Sheet.FlatList,
  },
  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Text>Hello world</Text>
          </Sheet.Content>
        </Sheet>
      </YBox>
    );
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const ScrollView: Story = {
  args: {},

  render(e) {
    return (
      <YBox style={inlineStyle(() => ({ base: { padding: 100 } }))}>
        <Sheet {...e}>
          <Sheet.Trigger asChild>
            <Button>
              <Button.Text>Button</Button.Text>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.ScrollView>
              {Array.from(Array(100).keys()).map((i) => (
                <Text key={`renderscrollviewvody-${i}`}>Description {i}</Text>
              ))}
            </Sheet.ScrollView>
          </Sheet.Content>
        </Sheet>
      </YBox>
    );
  },
};
