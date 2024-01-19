/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import '@/types/unistyles';
import { SideBarLayout } from '@/components/SideBarLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(SideBarLayout, {
  menus: [
    { href: '/router/introduction', title: 'Introduction' },
    { href: '/router/setup', title: 'Setup' },
  ],
});
