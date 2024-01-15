'use client';

import { parseStyle } from '@crossed/styled';
import { Anchor, AnchorProps } from '@crossed/ui';
import LinkNext, { LinkProps as LinkNextProps } from 'next/link';

export const Link = function Link({
  children,
  ...props
}: LinkProps & { target?: '_blank' }) {
  return (
    <Anchor {...(props as any)}>
      {(p) => (
        <LinkNext {...(p as any)} style={parseStyle(p.style)}>
          {children}
        </LinkNext>
      )}
    </Anchor>
  );
};

export type LinkProps = AnchorProps & LinkNextProps;
