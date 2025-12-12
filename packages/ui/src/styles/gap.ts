/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';
import { SpaceName } from '@crossed/theme';

export const gapStyles = createStyles(({ space }) =>
  (Object.keys(space) as SpaceName[]).reduce(
    (acc, spaceName) => {
      acc[spaceName] = { base: { 'gap': space[spaceName] } };
      return acc;
    },
    {} as Record<SpaceName, any>
  )
);
