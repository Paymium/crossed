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
  'flexEnd': { base: { alignItems: 'flex-end' } },
  'flexStart': { base: { alignItems: 'flex-start' } },
  'stretch': { base: { alignItems: 'stretch' } },
}));

export const alignSelfStyle = createStyles(() => ({
  'center': { base: { alignSelf: 'center' } },
  'baseline': { base: { alignSelf: 'baseline' } },
  'flexEnd': { base: { alignSelf: 'flex-end' } },
  'flexStart': { base: { alignSelf: 'flex-start' } },
  'stretch': { base: { alignSelf: 'stretch' } },
}));

export const alignSelfResponsiveStyle = createStyles(() => ({
  'mdCenter': { media: { md: { alignSelf: 'center' } } },
  'mdBaseline': { media: { md: { alignSelf: 'baseline' } } },
  'mdFlexEnd': { media: { md: { alignSelf: 'flex-end' } } },
  'mdFlexStart': { media: { md: { alignSelf: 'flex-start' } } },
  'mdStretch': { media: { md: { alignSelf: 'stretch' } } },
}));
