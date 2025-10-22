/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@crossed/ui/src/display/Badge';
import { ColorsBadge } from '@crossed/ui/src/display/Badge/type';
import { XBox, YBox } from '@crossed/ui';
import { ChevronRight, X } from '@crossed/unicons';

const colors: ColorsBadge[] = [
  'gray',
  'brand',
  'error',
  'warning',
  'success',
  'grayBlue',
  'blueLight',
  'blue',
  'indigo',
  'purple',
  'pink',
  'orange',
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Badge> = {
  component: Badge,
  subcomponents: {
    'Badge.Text': Badge.Text,
    'Badge.Group': Badge.Group,
    'Badge.Icon': Badge.Icon,
  },
  parameters: { layout: 'centered' },
  argTypes: {},
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
  args: {},
  render(e) {
    return (
      <XBox space={'sm'}>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-default`} variant={v}>
              <Badge.Text>Badge</Badge.Text>
            </Badge>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-rounded`} variant={v} rounded>
              <Badge.Text>Badge</Badge.Text>
            </Badge>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-icon`} variant={v}>
              <Badge.Text>Badge</Badge.Text>
              <Badge.Icon>
                <ChevronRight />
              </Badge.Icon>
            </Badge>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-close`} variant={v}>
              <Badge.Icon>
                <X />
              </Badge.Icon>
              <Badge.Text>Badge</Badge.Text>
            </Badge>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-icon-only`} variant={v}>
              <Badge.Icon>
                <X />
              </Badge.Icon>
            </Badge>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge {...e} key={`${v}-icon-only-rounded`} variant={v} rounded>
              <Badge.Icon>
                <X />
              </Badge.Icon>
            </Badge>
          ))}
        </YBox>
      </XBox>
    );
  },
};

export const Group: Story = {
  parameters: {
    docs: {
      source: { language: 'tsx' },
    },
  },
  args: {},
  render(e) {
    return (
      <XBox space={'sm'}>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge.Group key={`${v}-default-group`} {...e} variant={v}>
              <Badge>
                <Badge.Text>Version 4.0</Badge.Text>
              </Badge>
              <Badge.Text>Badge</Badge.Text>
            </Badge.Group>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge.Group key={`${v}-rounded-group`} {...e} variant={v} rounded>
              <Badge>
                <Badge.Text>Version 4.0</Badge.Text>
              </Badge>
              <Badge.Text>Badge</Badge.Text>
            </Badge.Group>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge.Group key={`${v}-icon-group`} {...e} variant={v} rounded>
              <Badge>
                <Badge.Text>Version 4.0</Badge.Text>
              </Badge>
              <Badge.Text>Badge</Badge.Text>
              <Badge.Icon>
                <ChevronRight />
              </Badge.Icon>
            </Badge.Group>
          ))}
        </YBox>
        <YBox space={'sm'}>
          {colors.map((v) => (
            <Badge.Group
              key={`${v}-icon-group-pressable`}
              pressable
              {...e}
              variant={v}
              rounded
            >
              <Badge>
                <Badge.Text>Version 4.0</Badge.Text>
              </Badge>
              <Badge.Text>Pressable</Badge.Text>
              <Badge.Icon>
                <ChevronRight />
              </Badge.Icon>
            </Badge.Group>
          ))}
        </YBox>
        {/*<YBox space={'sm'}>*/}
        {/*  {colors.map((v) => (*/}
        {/*    <Badge {...e} key={`${v}-close`} variant={v}>*/}
        {/*      <Badge.Icon>*/}
        {/*        <X />*/}
        {/*      </Badge.Icon>*/}
        {/*      <Badge.Text>Badge</Badge.Text>*/}
        {/*    </Badge>*/}
        {/*  ))}*/}
        {/*</YBox>*/}
        {/*<YBox space={'sm'}>*/}
        {/*  {colors.map((v) => (*/}
        {/*    <Badge {...e} key={`${v}-icon-only`} variant={v}>*/}
        {/*      <Badge.Icon>*/}
        {/*        <X />*/}
        {/*      </Badge.Icon>*/}
        {/*    </Badge>*/}
        {/*  ))}*/}
        {/*</YBox>*/}
      </XBox>
    );
  },
};
