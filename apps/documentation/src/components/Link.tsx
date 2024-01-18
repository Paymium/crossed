'use client';

import { Anchor, AnchorProps } from '@crossed/ui';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';

export const Link = function Link({
  children,
  ...props
}: LinkProps & { target?: '_blank' }) {
  return (
    <Anchor {...(props as any)} asChild>
      <LinkNext {...(props as any)}>{children}</LinkNext>
    </Anchor>
  );
};

export type LinkProps = AnchorProps & LinkNextProps;
