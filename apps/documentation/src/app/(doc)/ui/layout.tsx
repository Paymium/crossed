'use client';
import '@/types/unistyles';
import { SideBarLayout } from '@/components/SideBarLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(SideBarLayout, {
  menus: [
    { href: '/ui/introduction', title: 'Introduction' },
    { href: '/ui/setup', title: 'Setup' },

    { title: 'Disclosure' },
    { href: '/ui/Accordion', title: 'Accordion' },
    { href: '/ui/Tabs', title: 'Tabs' },

    { title: 'Display' },
    { href: '/ui/Badge', title: 'Badge' },
    { href: '/ui/Card', title: 'Card' },
    { href: '/ui/Code', title: 'Code' },
    { href: '/ui/Kbd', title: 'Kbd' },
    { href: '/ui/List', title: 'List' },
    { href: '/ui/MenuList', title: 'MenuList' },

    { title: 'Feedback' },
    { href: '/ui/Alert', title: 'Alert' },
    { href: '/ui/Skeleton', title: 'Skeleton' },
    { href: '/ui/Spinner', title: 'Spinner' },

    { title: 'Forms' },
    { href: '/ui/Button', title: 'Button' },
    { href: '/ui/Checkbox', title: 'Checkbox' },
    // { href: '/ui/Form', title: 'Form' },
    { href: '/ui/Input', title: 'Input' },
    { href: '/ui/Label', title: 'Label' },
    { href: '/ui/Radio', title: 'Radio' },
    { href: '/ui/Select', title: 'Select' },
    { href: '/ui/Slider', title: 'Slider' },
    { href: '/ui/Switch', title: 'Switch' },
    { href: '/ui/Textarea', title: 'Textarea' },

    { title: 'Layout' },
    { href: '/ui/Box', title: 'Box' },
    { href: '/ui/Center', title: 'Center' },
    { href: '/ui/Separator', title: 'Separator' },
    { href: '/ui/XBox', title: 'XBox' },
    { href: '/ui/YBox', title: 'YBox' },

    { title: 'Typography' },
    { href: '/ui/Anchor', title: 'Anchor' },
    { href: '/ui/B', title: 'B' },
    { href: '/ui/Heading', title: 'Heading' },
    { href: '/ui/I', title: 'I' },
    { href: '/ui/P', title: 'P' },
    { href: '/ui/Text', title: 'Text' },
  ],
});
