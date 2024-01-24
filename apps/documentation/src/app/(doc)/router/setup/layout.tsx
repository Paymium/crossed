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
    // { title: 'Introduction', href: '#introduction' },
    // { title: 'Key Features', href: '#features' },
    // { title: 'Dependencies used', href: '#dependencies' },
  ],
});
