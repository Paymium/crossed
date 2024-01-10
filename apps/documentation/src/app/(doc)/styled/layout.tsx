'use client';
import '@/types/unistyles';
import { SideBarLayout } from '@/components/SideBarLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(SideBarLayout, { menus: [
  { href: '/styled/introduction', title: 'Introduction' },
  { href: '/styled/setup', title: 'Setup' },
  { title: 'Guide' },
  { href: '/styled/concept', title: 'Concept' },
  { href: '/styled/usage', title: 'Usage' },
  { title: 'Reference' },
  { href: '/styled/reference/styled', title: 'styled' },
  { href: '/styled/reference/Registry', title: 'Registry' },
] });

