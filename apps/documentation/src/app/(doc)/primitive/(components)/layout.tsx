/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { title: 'Example', href: '#example' },
    { title: 'Anatomy', href: '#anatomy' },
    { title: 'Params', href: '#params' },
    { title: 'Return', href: '#return' },
    { title: 'Types', href: '#types' },
  ],
});
