'use client';
import '@/types/unistyles';
import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { href: '#install', title: 'Install dependencies' },
    { href: '#configure', title: 'Configure' },
    { href: '#usage', title: 'Usage' },
  ],
});
