/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { XBox } from '@crossed/ui';
import { withStyle } from '@crossed/styled';

const Container = withStyle(XBox, {
  base: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default Container;
