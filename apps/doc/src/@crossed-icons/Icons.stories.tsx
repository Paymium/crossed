/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import * as icons from '@crossed/icons';
import { XBox, YBox, Center, Text } from '@crossed/ui';
import { RequireOnly } from '@crossed/icons/lib/typescript/types';
import { themes } from '@crossed/theme';
import { inlineStyle } from '@crossed/styled';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function collectPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  const out: string[] = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const p = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(val))
      out.push(...collectPaths(val as Record<string, unknown>, p));
    else out.push(p);
  }
  return out.sort();
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<RequireOnly<'color' | 'size'>> = {
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: collectPaths(themes.light.colors) },
    size: { control: 'number' },
  },
  args: {
    size: 24,
    color: 'text.primary.default',
  },
  render: (e) => (
    <XBox
      space={'xl'}
      style={inlineStyle(() => ({ base: { flexWrap: 'wrap' } }))}
    >
      {Object.entries(icons).map(([key, Icon]: any) => (
        <Center key={key} style={inlineStyle(() => ({ base: { flex: 1 } }))}>
          <Icon {...e} />
          <Text fontSize={'xs'}>{key}</Text>
        </Center>
      ))}
    </XBox>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
