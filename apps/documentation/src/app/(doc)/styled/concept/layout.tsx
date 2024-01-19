/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import '@/types/unistyles';
import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { href: '#migrate', title: 'Migrate to @crossed/styled' },
    { href: '#interaction', title: 'User interaction' },
  ],
});
