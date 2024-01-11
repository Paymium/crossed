'use client';

import '@/types/unistyles';
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
