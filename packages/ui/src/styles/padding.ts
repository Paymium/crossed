/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { SpaceName } from '@crossed/theme';

export const paddingVerticalStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginVertical': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingHorizontalStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginHorizontal': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingLeftStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'paddingLeft': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingRightStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'paddingRight': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingBottomStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'paddingBottom': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingTopStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'paddingTop': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const paddingStyles = (
  Object.keys(paddingVerticalStyles) as SpaceName[]
).reduce(
  (acc, spaceName) => {
    acc[spaceName] = composeStyles(
      paddingVerticalStyles[spaceName],
      paddingHorizontalStyles[spaceName]
    );
    return acc;
  },
  {} as Record<SpaceName, any>
);
