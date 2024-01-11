'use client';

import '@/types/unistyles';
import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { href: '#create', title: 'Create component' },
    { href: '#extend', title: 'Extend component' },
  ],
});
