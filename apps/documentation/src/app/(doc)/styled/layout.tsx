/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import '@/style.config';
import { SideBarLayout } from '@/components/SideBarLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(SideBarLayout, {
  menus: [
    { href: '/styled/introduction', title: 'Introduction' },
    { href: '/styled/setup', title: 'Setup' },
    { href: '/styled/usage', title: 'Usage' },
    {
      title: 'Plugin',
      menus: [
        { href: '/styled/plugins', title: 'Introduction' },
        { href: '/styled/plugins/base', title: 'Base' },
        { href: '/styled/plugins/variants', title: 'Variants' },
        { href: '/styled/plugins/pseudoclass', title: 'PseudoClass' },
        { href: '/styled/plugins/mediaqueries', title: 'MediaQueries' },
        { href: '/styled/plugins/web', title: 'Web' },
      ],
    },
    {
      title: 'Reference',
      menus: [
        { href: '/styled/reference/createStyles', title: 'createStyles' },
        { href: '/styled/reference/Registry', title: 'Registry' },
      ],
    },
  ],
});
