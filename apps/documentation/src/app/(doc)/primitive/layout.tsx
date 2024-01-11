'use client';
import { SideBarLayout } from '@/components/SideBarLayout';
import '@/types/unistyles';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(SideBarLayout, {
  menus: [
    { href: '/primitive/introduction', title: 'Introduction' },
    { href: '/primitive/setup', title: 'Setup' },
    { title: 'Components' },
    { href: '/primitive/createBadge', title: 'createBadge' },
    { href: '/primitive/createButton', title: 'createButton' },
    { href: '/primitive/createDropdown', title: 'createDropdown' },
    { href: '/primitive/createInput', title: 'createInput' },
    { href: '/primitive/createLabel', title: 'createLabel' },
    { href: '/primitive/createList', title: 'createList' },
    { href: '/primitive/createModal', title: 'createModal' },
    { href: '/primitive/createSelect', title: 'createSelect' },
    { href: '/primitive/createSheet', title: 'createSheet' },
  ],
});
