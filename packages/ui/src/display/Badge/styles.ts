/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles, StyleSheet } from '@crossed/styled';
import { ColorsBadgeStyle } from './type';

export const badgeStyle = createStyles(({ radius, space }) => ({
  default: { base: { borderWidth: 1, borderRadius: radius.sm } },
  rounded: { base: { borderRadius: radius.full } },
  group: { base: { paddingVertical: space.xs, paddingHorizontal: space.xs } },
}));
export const badgeSizeStyle = createStyles(({ space }) => ({
  sm: { base: { paddingVertical: space.xxs, paddingHorizontal: space.sm } },
  md: { base: { paddingVertical: space.xxs, paddingHorizontal: space.md } },
  lg: { base: { paddingVertical: space.xs, paddingHorizontal: 10 } },
}));
export const badgeSizeRoundedStyle = createStyles(({ space }) => ({
  sm: { base: { paddingVertical: space.xxs, paddingHorizontal: space.md } },
  md: { base: { paddingVertical: space.xxs, paddingHorizontal: 10 } },
  lg: { base: { paddingVertical: space.xs, paddingHorizontal: space.lg } },
}));
export const badgeTextColor = createStyles(
  ({ colors }) =>
    ({
      'gray': { base: { color: colors.utility.gray['700'] } },
      'brand': { base: { color: colors.utility.brand['700'].default } },
      'error': { base: { color: colors.utility.error['700'] } },
      'warning': { base: { color: colors.utility.warning['700'] } },
      'success': { base: { color: colors.utility.success['700'] } },
      'grayBlue': { base: { color: colors.utility.grayBlue['700'] } },
      'blueLight': { base: { color: colors.utility.blueLight['700'] } },
      'blue': { base: { color: colors.utility.blue['700'] } },
      'indigo': { base: { color: colors.utility.indigo['700'] } },
      'purple': { base: { color: colors.utility.purple['700'] } },
      'pink': { base: { color: colors.utility.pink['700'] } },
      'orange': { base: { color: colors.utility.orange['700'] } },
    }) satisfies ColorsBadgeStyle
);
export const badgeContentColor = createStyles(
  ({ colors }) =>
    ({
      'gray': {
        base: {
          borderColor: colors.utility.gray['200'],
          backgroundColor: colors.utility.gray['50'],
        },
      },
      'brand': {
        base: {
          borderColor: colors.utility.brand['200'].default,
          backgroundColor: colors.utility.brand['50'].default,
        },
      },
      'error': {
        base: {
          borderColor: colors.utility.error['200'],
          backgroundColor: colors.utility.error['50'],
        },
      },
      'warning': {
        base: {
          borderColor: colors.utility.warning['200'],
          backgroundColor: colors.utility.warning['50'],
        },
      },
      'success': {
        base: {
          borderColor: colors.utility.success['200'],
          backgroundColor: colors.utility.success['50'],
        },
      },
      'grayBlue': {
        base: {
          borderColor: colors.utility.grayBlue['200'],
          backgroundColor: colors.utility.grayBlue['50'],
        },
      },
      'blueLight': {
        base: {
          borderColor: colors.utility.blueLight['200'],
          backgroundColor: colors.utility.blueLight['50'],
        },
      },
      'blue': {
        base: {
          borderColor: colors.utility.blue['200'],
          backgroundColor: colors.utility.blue['50'],
        },
      },
      'indigo': {
        base: {
          borderColor: colors.utility.indigo['200'],
          backgroundColor: colors.utility.indigo['50'],
        },
      },
      'purple': {
        base: {
          borderColor: colors.utility.purple['200'],
          backgroundColor: colors.utility.purple['50'],
        },
      },
      'pink': {
        base: {
          borderColor: colors.utility.pink['200'],
          backgroundColor: colors.utility.pink['50'],
        },
      },
      'orange': {
        base: {
          borderColor: colors.utility.orange['200'],
          backgroundColor: colors.utility.orange['50'],
        },
      },
    }) satisfies ColorsBadgeStyle
);

export const badgePressableContentColor = createStyles(
  ({ colors }) =>
    ({
      'gray': {
        ':hover': { backgroundColor: colors.utility.gray['100'] },
      },
      'brand': {
        ':hover': { backgroundColor: colors.utility.brand['100'].default },
      },
      'error': {
        ':hover': { backgroundColor: colors.utility.error['100'] },
      },
      'warning': {
        ':hover': { backgroundColor: colors.utility.warning['100'] },
      },
      'success': {
        ':hover': { backgroundColor: colors.utility.success['100'] },
      },
      'grayBlue': {
        ':hover': { backgroundColor: colors.utility.grayBlue['100'] },
      },
      'blueLight': {
        ':hover': { backgroundColor: colors.utility.blueLight['100'] },
      },
      'blue': { ':hover': { backgroundColor: colors.utility.blue['100'] } },
      'indigo': { ':hover': { backgroundColor: colors.utility.indigo['100'] } },
      'purple': { ':hover': { backgroundColor: colors.utility.purple['100'] } },
      'pink': { ':hover': { backgroundColor: colors.utility.pink['100'] } },
      'orange': { ':hover': { backgroundColor: colors.utility.orange['100'] } },
    }) satisfies ColorsBadgeStyle
);
