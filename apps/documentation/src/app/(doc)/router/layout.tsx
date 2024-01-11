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
