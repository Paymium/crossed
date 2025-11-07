/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Pagination,
  setNextLabel,
  setPrevLabel,
} from '@crossed/ui/src/Buttons/Pagination';
import { growStyles, YBox, Button } from '@crossed/ui';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Pagination> = {
  component: Pagination,
  subcomponents: {
    'Pagination.Next': Pagination.Next,
    'Pagination.Prev': Pagination.Prev,
    'Pagination.Links': Pagination.Links,
    'Pagination.Compact': Pagination.Compact,
  },
  argTypes: {
    variant: { control: 'select', options: ['square', 'circle'] },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { onChangePage: fn() },
  render: (e) => (
    <YBox space={'md'}>
      <Pagination {...e} pageCount={10} currentPageNumber={1}>
        <Pagination.Prev />
        <Pagination.Links />
        <Pagination.Next />
      </Pagination>
      <Pagination {...e} pageCount={10} currentPageNumber={1}>
        <Pagination.Prev />
        <Pagination.Compact />
        <Pagination.Next />
      </Pagination>
      <Pagination {...e} pageCount={10} currentPageNumber={1} space={'md'}>
        <Pagination.Compact style={growStyles.on} />
        <Pagination.Prev />
        <Pagination.Next />
      </Pagination>
    </YBox>
  ),
};

export const Square: Story = {
  ...Primary,
  args: { variant: 'square' },
};
export const Circle: Story = {
  ...Primary,
  args: { variant: 'circle' },
};
export const SetLabel: Story = {
  args: { onChangePage: fn() },
  render(e) {
    const [count, setCount] = useState(0);
    return (
      <YBox space={'md'}>
        <Button
          onPress={() => {
            setNextLabel(`Next ${count}`);
            setPrevLabel(`Prev ${count}`);
            setCount(count + 1);
          }}
        >
          <Button.Text>Set label next/prev</Button.Text>
        </Button>
        <Pagination {...e} key={count} pageCount={10} currentPageNumber={1}>
          <Pagination.Prev />
          <Pagination.Links />
          <Pagination.Next />
        </Pagination>
      </YBox>
    );
  },
};
