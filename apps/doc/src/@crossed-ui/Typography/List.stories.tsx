/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { YBox, Text } from '@crossed/ui';
import { List } from '@crossed/ui/src/typography/List';
import { Check } from '@crossed/icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  component: List,
  subcomponents: {
    'List.Li': List.Li,
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  render: () => {
    return (
      <YBox>
        <Text>One text</Text>
        <List>
          <List.Li misc={<Check color={'text.success.default'} />}>
            <Text>Totot</Text>
          </List.Li>
          <List.Li>
            <Text>Tata</Text>
          </List.Li>
          <List.Li>
            <Text>Dupon</Text>
          </List.Li>
          <List.Li>
            <Text>Titi</Text>
          </List.Li>
        </List>
      </YBox>
    );
  },
};
