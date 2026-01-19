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

export const alignItemsResponsiveStyle = createStyles(() => ({
  mdCenter: { media: { md: { alignItems: 'center' } } },
  mdBaseline: { media: { md: { alignItems: 'baseline' } } },
  mdEnd: { media: { md: { alignItems: 'flex-end' } } },
  mdStart: { media: { md: { alignItems: 'flex-start' } } },
  mdStretch: { media: { md: { alignItems: 'stretch' } } },
}));

export const alignSelfStyle = createStyles(() => ({
  'center': { base: { alignSelf: 'center' } },
  'baseline': { base: { alignSelf: 'baseline' } },
  'flex-end': { base: { alignSelf: 'flex-end' } },
  'flex-start': { base: { alignSelf: 'flex-start' } },
  'stretch': { base: { alignSelf: 'stretch' } },
}));

export const alignSelfResponsiveStyle = createStyles(() => ({
  mdCenter: { media: { md: { alignSelf: 'center' } } },
  mdBaseline: { media: { md: { alignSelf: 'baseline' } } },
  mdEnd: { media: { md: { alignSelf: 'flex-end' } } },
  mdStart: { media: { md: { alignSelf: 'flex-start' } } },
  mdStretch: { media: { md: { alignSelf: 'stretch' } } },
}));
