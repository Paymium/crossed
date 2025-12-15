/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { composeStyles, createStyles } from '@crossed/styled';
import { SpaceName } from '@crossed/theme';

export const marginVerticalStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginVertical': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginHorizontalStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginHorizontal': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginLeftStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginLeft': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginRightStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginRight': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginBottomStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginBottom': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginTopStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'marginTop': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);

export const marginStyles = (
  Object.keys(marginVerticalStyles) as SpaceName[]
).reduce(
  (acc, spaceName) => {
    acc[spaceName] = composeStyles(
      marginVerticalStyles[spaceName],
      marginHorizontalStyles[spaceName]
    );
    return acc;
  },
  {} as Record<SpaceName, any>
);
