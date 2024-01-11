// 'use client';

import '@/types/unistyles';
import { TOCLayout } from '@/components/TOCLayout';
import { withDefaultProps } from '@crossed/core';

export default withDefaultProps(TOCLayout, {
  links: [
    { title: 'Introduction', href: '#introduction' },
    { title: 'Key Features', href: '#features' },
    { title: 'Dependencies used', href: '#dependencies' },
  ],
});
