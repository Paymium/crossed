/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createStyles } from '@crossed/styled';

export const alignItemsStyle = createStyles(() => ({
  'center': { base: { alignItems: 'center' } },
  'baseline': { base: { alignItems: 'baseline' } },
  'flex-end': { base: { alignItems: 'flex-end' } },
  'flex-start': { base: { alignItems: 'flex-start' } },
  'stretch': { base: { alignItems: 'stretch' } },
}));

export const alignSelfStyle = createStyles(() => ({
  'center': { base: { alignSelf: 'center' } },
  'baseline': { base: { alignSelf: 'baseline' } },
  'flex-end': { base: { alignSelf: 'flex-end' } },
  'flex-start': { base: { alignSelf: 'flex-start' } },
  'stretch': { base: { alignSelf: 'stretch' } },
}));
