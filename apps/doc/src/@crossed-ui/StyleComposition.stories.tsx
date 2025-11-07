/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  paddingHorizontalStyles,
  paddingVerticalStyles,
  Text,
  Box,
  YBox,
  XBox,
  shadowStyles,
  gapStyles,
  alignItemsStyle,
  growStyles,
  textAlignStyles,
} from '@crossed/ui';
import { composeStyles, inlineStyle } from '@crossed/styled';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  parameters: {
    sidebar: { hidden: true },
  },
};

export default meta;
type Story = StoryObj;

const shadowBox = composeStyles(
  paddingHorizontalStyles.md,
  paddingVerticalStyles.md,
  inlineStyle(() => ({ base: { width: 200, height: 200 } }))
);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Shadow: Story = {
  render: () => (
    <XBox space={'lg'}>
      <Box style={composeStyles(shadowBox, shadowStyles.xs)}>
        <Text>shadowStyles.xs</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles.sm)}>
        <Text>shadowStyles.sm</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles.md)}>
        <Text>shadowStyles.md</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles.lg)}>
        <Text>shadowStyles.lg</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles.xl)}>
        <Text>shadowStyles.xl</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles['2xl'])}>
        <Text>shadowStyles['2xl']</Text>
      </Box>
      <Box style={composeStyles(shadowBox, shadowStyles['3xl'])}>
        <Text>shadowStyles['3xl']</Text>
      </Box>
    </XBox>
  ),
};

const boxGap = inlineStyle(({ colors }) => ({
  base: { backgroundColor: colors.utility.pink['400'], width: 50, height: 50 },
}));
export const Gap: Story = {
  render: () => (
    <YBox space={'lg'}>
      {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((key) => (
        <YBox key={`gap${key}`}>
          <Text>gapStyles.{key}</Text>
          <XBox style={gapStyles[key]}>
            <Box style={boxGap} />
            <Box style={boxGap} />
            <Box style={boxGap} />
            <Box style={boxGap} />
          </XBox>
        </YBox>
      ))}
    </YBox>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <XBox space={'lg'}>
      <YBox style={growStyles.on} space={'lg'}>
        <Text>flexDirection: row</Text>
        {(
          [
            'center',
            'mdCenter',
            'baseline',
            'flex-end',
            'flex-start',
            'stretch',
          ] as const
        ).map((key) => (
          <YBox key={`alignItemsStyle${key}`}>
            <Text>alignItemsStyle.{key}</Text>
            <XBox style={alignItemsStyle[key]} space={'md'}>
              <Box
                style={composeStyles(
                  boxGap,
                  inlineStyle(() => ({ base: { height: 15 } }))
                )}
              />
              <Box
                style={composeStyles(
                  boxGap,
                  inlineStyle(() => ({ base: { height: 25 } }))
                )}
              />
              <Box style={boxGap} />
            </XBox>
          </YBox>
        ))}
      </YBox>
      <YBox style={growStyles.on} space={'lg'}>
        <Text>flexDirection: column</Text>
        {(
          [
            'center',
            'mdCenter',
            'baseline',
            'flex-end',
            'flex-start',
            'stretch',
          ] as const
        ).map((key) => (
          <YBox key={`alignItemsStyle-column${key}`}>
            <Text>alignItemsStyle.{key}</Text>
            <YBox style={alignItemsStyle[key]} space={'md'}>
              <Box
                style={composeStyles(
                  boxGap,
                  inlineStyle(() => ({ base: { height: 15 } }))
                )}
              />
              <Box
                style={composeStyles(
                  boxGap,
                  inlineStyle(() => ({ base: { height: 25 } }))
                )}
              />
              <Box style={boxGap} />
            </YBox>
          </YBox>
        ))}
      </YBox>
    </XBox>
  ),
};

export const TextAlign: Story = {
  render: () => (
    <YBox space={'lg'}>
      {(['auto', 'justify', 'default', 'center', 'left', 'right'] as const).map(
        (key) => (
          <Text key={`textAlignStyles[${key}]`} style={textAlignStyles[key]}>
            textAlignStyles.{key}
          </Text>
        )
      )}
    </YBox>
  ),
};
