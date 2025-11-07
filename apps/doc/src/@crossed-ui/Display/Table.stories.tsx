/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '@crossed/ui/src/display/Table';
import { XBox, Text, Box, Group } from '@crossed/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Table> = {
  component: Table,
  subcomponents: {
    'Table.TBody': Table.TBody,
    'Table.THead': Table.THead,
    'Table.Tr': Table.Tr,
    'Table.Td': Table.Td,
    'Table.Th': Table.Th,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  render: (e) => (
    <Table {...e}>
      <Table.THead>
        <Table.Tr>
          <Table.Th>Column 1</Table.Th>
          <Table.Th>Column 2</Table.Th>
          <Table.Th>Column 3</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody>
        <Table.Tr>
          <Table.Td>
            Vivamus molestie tristique diam, eu molestie risus efficitur vitae.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            porttitor, eros in egestas convallis, est massa tempor lorem, vel
            porttitor tortor lectus non neque.
          </Table.Td>
          <Table.Td>
            Vivamus molestie tristique diam, eu molestie risus efficitur vitae.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            porttitor, eros in egestas convallis, est massa tempor lorem, vel
            porttitor tortor lectus non neque.
          </Table.Td>
          <Table.Td>data 2</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            Vivamus molestie tristique diam, eu molestie risus efficitur vitae.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            porttitor, eros in egestas convallis, est massa tempor lorem, vel
            porttitor tortor lectus non neque.
          </Table.Td>
          <Table.Td>data 2</Table.Td>
          <Table.Td>data 2</Table.Td>
        </Table.Tr>
      </Table.TBody>
    </Table>
  ),
};
