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
    { href: '/ui/introduction', title: 'Introduction' },
    { href: '/ui/setup', title: 'Setup' },

    {
      title: 'Disclosure',
      menus: [
        { href: '/ui/Accordion', title: 'Accordion' },
        { href: '/ui/Tabs', title: 'Tabs' },
      ],
    },

    {
      title: 'Display',
      menus: [
        { href: '/ui/Badge', title: 'Badge' },
        { href: '/ui/Card', title: 'Card' },
        { href: '/ui/Code', title: 'Code' },
        { href: '/ui/Kbd', title: 'Kbd' },
        { href: '/ui/List', title: 'List' },
        { href: '/ui/MenuList', title: 'MenuList' },
      ],
    },

    {
      title: 'Feedback',
      menus: [
        { href: '/ui/Alert', title: 'Alert' },
        { href: '/ui/Banner', title: 'Banner' },
        { href: '/ui/Skeleton', title: 'Skeleton' },
        { href: '/ui/Spinner', title: 'Spinner' },
      ],
    },

    {
      title: 'Buttons',
      menus: [
        { href: '/ui/Button', title: 'Button' },
        { href: '/ui/CloseButton', title: 'CloseButton' },
      ],
    },

    { title: 'Forms', menus: [{ href: '/ui/Form', title: 'Form' }] },

    { title: 'Overlay', menus: [{ href: '/ui/Modal', title: 'Modal' }] },

    {
      title: 'Input',
      menus: [
        { href: '/ui/Checkbox', title: 'Checkbox' },
        // { href: '/ui/Form', title: 'Form' },
        { href: '/ui/Input', title: 'Input' },
        { href: '/ui/Radio', title: 'Radio' },
        { href: '/ui/Select', title: 'Select' },
        { href: '/ui/Slider', title: 'Slider' },
        { href: '/ui/Switch', title: 'Switch' },
        { href: '/ui/Textarea', title: 'Textarea' },
      ],
    },

    {
      title: 'Layout',
      menus: [
        { href: '/ui/Box', title: 'Box' },
        { href: '/ui/Center', title: 'Center' },
        { href: '/ui/Separator', title: 'Separator' },
        { href: '/ui/XBox', title: 'XBox' },
        { href: '/ui/YBox', title: 'YBox' },
      ],
    },

    {
      title: 'Typography',
      menus: [
        { href: '/ui/Anchor', title: 'Anchor' },
        { href: '/ui/B', title: 'B' },
        { href: '/ui/Heading', title: 'Heading' },
        { href: '/ui/I', title: 'I' },
        { href: '/ui/Label', title: 'Label' },
        { href: '/ui/P', title: 'P' },
        { href: '/ui/Text', title: 'Text' },
      ],
    },
  ],
});
