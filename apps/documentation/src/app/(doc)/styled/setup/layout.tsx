/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { href: '#install', title: 'Install dependencies' },
    { href: '#configure', title: 'Configure builder' },
    { href: '#usage', title: 'Usage' },
  ],
});
